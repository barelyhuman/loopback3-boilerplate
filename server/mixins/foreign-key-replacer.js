'use strict';

const ACCEPTED_RELATION_TYPES = ['belongsTo'];
module.exports = function (Model, options) {

    Model.observe('loaded', function (ctx, next) {
        if (ctx.data) {
            //Dont use all those fk_id_xxxx in javascript or rest
            //replace them with a field with property tag for easy exposure
            for (let relation in ctx.Model.definition.settings.relations) {
                if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey) {
                    if (ctx.Model.definition.settings.relations[relation].property) {
                        ctx.data[ctx.Model.definition.settings.relations[relation].property] =
                            ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey];
                    } else {
                        ctx.data[relation + 'Id'] = ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey];
                    }
                    // delete ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey]; //Was causing error in hasMany relations
                }
            }
        }
        next();
    });

    Model.observe('before save', function (ctx, next) {
        if (ctx.data) {
            //convert all those hungarian notations back into something like fk_id_xxxxx
            for (let relation in ctx.Model.definition.settings.relations) {
                if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey && ctx.Model.definition.settings.relations[relation].property &&
                    ctx.data[ctx.Model.definition.settings.relations[relation].property] !== undefined) {

                    ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey] =
                        ctx.data[ctx.Model.definition.settings.relations[relation].property];
                    delete ctx.data[ctx.Model.definition.settings.relations[relation].property];

                } else if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey &&
                    ctx.Model.definition.settings.relations[relation].property === undefined &&
                    ctx.data[relation + 'Id'] !== undefined) {

                    ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey] = ctx.data[relation + 'Id'];
                    delete ctx.data[relation + 'Id'];
                }
            }
        } else if (ctx.instance) {
            //convert all those hungarian notations back into something like fk_id_xxxxx
            for (let relation in ctx.Model.definition.settings.relations) {
                if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey && ctx.Model.definition.settings.relations[relation].property &&
                    ctx.instance[ctx.Model.definition.settings.relations[relation].property] !== undefined) {

                    ctx.instance[ctx.Model.definition.settings.relations[relation].foreignKey] =
                        ctx.instance[ctx.Model.definition.settings.relations[relation].property];
                    delete ctx.instance[ctx.Model.definition.settings.relations[relation].property];

                } else if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey &&
                    ctx.Model.definition.settings.relations[relation].property === undefined &&
                    ctx.instance[relation + 'Id'] !== undefined) {

                    ctx.instance[ctx.Model.definition.settings.relations[relation].foreignKey] = ctx.instance[relation + 'Id'];
                    delete ctx.instance[relation + 'Id'];
                }
            }
        }
        next();
    });

    Model.observe('after save', function (ctx, next) {
        if (ctx.instance) {
            //Dont use all those fk_id_xxxx in javascript or rest
            //replace them with a field with property tag for easy exposure
            for (let relation in ctx.Model.definition.settings.relations) {
                if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey) {
                    if (ctx.Model.definition.settings.relations[relation].property) {
                        ctx.instance[ctx.Model.definition.settings.relations[relation].property] =
                            ctx.instance[ctx.Model.definition.settings.relations[relation].foreignKey];
                    } else {
                        ctx.instance[relation + 'Id'] = ctx.instance[ctx.Model.definition.settings.relations[relation].foreignKey];
                    }
                    // delete ctx.instance[ctx.Model.definition.settings.relations[relation].foreignKey];
                }
            }
        } else if (ctx.data) {
            //Dont use all those fk_id_xxxx in javascript or rest
            //replace them with a field with property tag for easy exposure
            for (let relation in ctx.Model.definition.settings.relations) {
                if (ACCEPTED_RELATION_TYPES.indexOf(ctx.Model.definition.settings.relations[relation].type) > -1 &&
                    ctx.Model.definition.settings.relations[relation].foreignKey) {
                    if (ctx.Model.definition.settings.relations[relation].property) {
                        ctx.data[ctx.Model.definition.settings.relations[relation].property] =
                            ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey];
                    } else {
                        ctx.data[relation + 'Id'] = ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey];
                    }
                    // delete ctx.data[ctx.Model.definition.settings.relations[relation].foreignKey];
                }
            }
        }
        next();
    });

    Model.observe('access', function (ctx, next) {
        let query = JSON.stringify(ctx.query);
        for (let relation in ctx.Model.definition.settings.relations) {
            if (ctx.Model.definition.settings.relations[relation].property) {
                query = query.replaceAll(ctx.Model.definition.settings.relations[relation].property,
                    ctx.Model.definition.settings.relations[relation].foreignKey);
            } else {
                query = query.replaceAll(relation + 'Id', ctx.Model.definition.settings.relations[relation].foreignKey);
            }
        }
        ctx.query = JSON.parse(query);
        next();
    });

};
