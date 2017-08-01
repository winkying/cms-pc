/**
 * Created by Jaron on 12/12/2016.
 */
(function (window, factory) {
    'use strict';
    factory(window['Vue'], window['dragula'], window['$']);

})(window, function (Vue, dragula, $) {


    window.drakeService = dndService();

    function createShadow() {
        return $('<div class=\"app-transit gu-transit\"><\/div>');
    }

    function removeShadow(context) {
        var shadow;
        if (context._shadow) {
            shadow = context._shadow.remove();
            context._shadow = null;
            return shadow;
        }
    }

    function dndService() {
        var drakeInstances = {};

        function initDrake(groupName) {
            var drake = dragula({
                direction: 'vertical',
                revertOnSpill: true,
                copy: true,
                copySortSource: true,
                moves: function (el, source, handle, sibling) {
                    var dragGroup = $(source).attr('app-drag-zone');
                    return dragGroup != null && dragGroup.indexOf(groupName) >= 0;
                },
                accepts: function (el, target, source, sibling) {
                    var dropGroup = $(target).attr('app-drop-zone'),
                        dragGroup = $(source).attr('app-drag-zone');
                    if (dropGroup && dragGroup) {
                        if ($(sibling).children().hasClass('frozen-zone')) {
                            return false;
                        } else {
                            return _.intersection(dropGroup.split(','), dragGroup.split(',')).length > 0;
                        }
                    }
                    return false;
                },
                invalid: function (el) {
                    return $(el).parent().hasClass('frozen-zone');
                }
            }).on('cloned', function (el) {
                $(el).css('list-style', 'none');
            }).on('shadow', function (el, container, source) {
                if (!this._shadow) {
                    this._shadow = createShadow();
                    $(el).after(this._shadow);
                    $(el).css('display', 'none');
                } else {
                    $(el).after(this._shadow);
                }
            }).on('dragend', function (el) {
                if (this._shadow) {
                    this._shadow.remove();
                    this._shadow = null;
                }
                $(el).remove();
            }).on('out', function () {
                if (this._shadow) {
                    this._shadow.remove();
                    this._shadow = null;
                }
            }).on('cancel', function () {
                if (this._shadow) {
                    this._shadow.remove();
                    this._shadow = null;
                }
            });
            drake._group = groupName;
            drake._draggable = false;
            drake._droppable = false;
            return drake;
        }

        return {
            draggable: function (groupName, container, bindList, callback) {
                var drakeGroup = drakeInstances[groupName];

                if (drakeGroup == null) {
                    drakeGroup = initDrake(groupName);
                    drakeInstances[groupName] = drakeGroup;
                }
                drakeGroup.on('drag', function (el, source) {
                    if ($.contains(container, el)) {
                        var idx = $(el).index(),
                            dragObj = bindList[idx];
                        if (typeof callback === 'function') {
                            dragObj = callback(dragObj, idx);
                        }
                        this._dragObj = dragObj;
                    }
                });
                drakeGroup.containers.push(container);
                var oldGroup = $(container).attr('app-drag-zone');

                if (oldGroup == null) {
                    $(container).attr('app-drag-zone', groupName);
                } else {
                    $(container).attr('app-drag-zone', oldGroup + ',' + groupName);
                }
                return drakeGroup;
            },

            droppable: function (groupName, container, callback) {
                var drakeGroup = drakeInstances[groupName];

                if (drakeGroup == null) {
                    drakeGroup = initDrake(groupName);
                    drakeInstances[groupName] = drakeGroup;
                }

                if (!drakeGroup._droppable) {
                    drakeGroup._droppable = true;
                    drakeGroup.on('drop', function (el, target, source, sibling) {
                        removeShadow(this);
                        var insertIdx = $(el).index();
                        if (typeof callback === 'function') {
                            // Include placeholder.
                            callback(this._dragObj, insertIdx);
                        }
                        this._dragObj = null;
                    })
                }
                drakeGroup.containers.push(container);
                var oldGroup = $(container).attr('app-drop-zone');

                if (oldGroup == null) {
                    $(container).attr('app-drop-zone', groupName);
                } else {
                    $(container).attr('app-drop-zone', oldGroup + ',' + groupName);
                }
                return drakeGroup;
            }
        }
    }

    
});