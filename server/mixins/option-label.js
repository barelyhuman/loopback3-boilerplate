'use strict';

module.exports = function (Model, options) {

    Model.observe('loaded', function event(ctx, next) {
        if (ctx.data) {
            if (Model && Model.definition && Model.definition.properties) {
                for (var property in Model.definition.properties) {
                    if (Model.definition.properties[property]['optionLabelIdentifier']) {
                        ctx.data[property + 'Label'] = getLabel(Model.app.models.Option.optionsMapForOptionLabelMixin,
                            Model.definition.properties[property]['optionLabelIdentifier'],
                            ctx.data[property]);
                    }
                }
            }
        }
        next();
    });

    function getLabel(optionsMap, identifier, value) {
        return (optionsMap[identifier] && optionsMap[identifier][value] ? optionsMap[identifier][value] : null);
    }
};
