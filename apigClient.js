/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://st9n96e2x7.execute-api.us-east-1.amazonaws.com/Stage1';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.analyticsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsInsightsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsInsightsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/insights').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsInsightsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsMenuPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsMenuPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/menu').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsMenuPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsMenuOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsMenuOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/menu').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsMenuOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsMenuRestaurantidGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['restaurantid'], ['body']);
        
        var analyticsMenuRestaurantidGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/menu/{restaurantid}').expand(apiGateway.core.utils.parseParametersToObject(params, ['restaurantid'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsMenuRestaurantidGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsMenuRestaurantidOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsMenuRestaurantidOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/menu/{restaurantid}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsMenuRestaurantidOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsScheduledEventPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsScheduledEventPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/scheduled-event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsScheduledEventPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.analyticsScheduledEventOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var analyticsScheduledEventOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/analytics/scheduled-event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(analyticsScheduledEventOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.menuPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var menuPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/menu').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(menuPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.menuOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var menuOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/menu').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(menuOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.menuRestaurantidGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['restaurantid'], ['body']);
        
        var menuRestaurantidGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/menu/{restaurantid}').expand(apiGateway.core.utils.parseParametersToObject(params, ['restaurantid'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(menuRestaurantidGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.menuRestaurantidOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var menuRestaurantidOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/menu/{restaurantid}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(menuRestaurantidOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/programs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/programs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsEnrolledProgramsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsEnrolledProgramsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/enrolledPrograms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsEnrolledProgramsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsEnrolledProgramsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsEnrolledProgramsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/enrolledPrograms').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsEnrolledProgramsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsEnrolledProgramsUseridGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userid'], ['body']);
        
        var programsEnrolledProgramsUseridGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/enrolledPrograms/{userid}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userid'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsEnrolledProgramsUseridGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsEnrolledProgramsUseridOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsEnrolledProgramsUseridOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/enrolledPrograms/{userid}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsEnrolledProgramsUseridOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsInstancesInstanceidGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['instanceid'], ['body']);
        
        var programsInstancesInstanceidGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/instances/{instanceid}').expand(apiGateway.core.utils.parseParametersToObject(params, ['instanceid'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsInstancesInstanceidGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.programsInstancesInstanceidOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var programsInstancesInstanceidOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/programs/instances/{instanceid}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(programsInstancesInstanceidOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recommendationsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recommendationsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/recommendations').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recommendationsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recommendationsRestaurantsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recommendationsRestaurantsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/recommendations/restaurants').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recommendationsRestaurantsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recommendationsRestaurantsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recommendationsRestaurantsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/recommendations/restaurants').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recommendationsRestaurantsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recommendationsScheduledEventPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recommendationsScheduledEventPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/recommendations/scheduled-event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recommendationsScheduledEventPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.recommendationsScheduledEventOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var recommendationsScheduledEventOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/recommendations/scheduled-event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(recommendationsScheduledEventOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.redemptionPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var redemptionPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/redemption').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(redemptionPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.redemptionPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var redemptionPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/redemption').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(redemptionPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.redemptionOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var redemptionOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/redemption').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(redemptionOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var restaurantsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurants').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantsUsersubscriptionsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userID'], ['body']);
        
        var restaurantsUsersubscriptionsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurants/usersubscriptions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['userID']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantsUsersubscriptionsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantsUsersubscriptionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var restaurantsUsersubscriptionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurants/usersubscriptions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantsUsersubscriptionsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantsRestaurantIDGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['restaurantID'], ['body']);
        
        var restaurantsRestaurantIDGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurants/{restaurantID}').expand(apiGateway.core.utils.parseParametersToObject(params, ['restaurantID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantsRestaurantIDGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.restaurantsRestaurantIDOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var restaurantsRestaurantIDOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/restaurants/{restaurantID}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(restaurantsRestaurantIDOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.searchRestaurantsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['location', 'query'], ['body']);
        
        var searchRestaurantsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/search/restaurants').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['location', 'query']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(searchRestaurantsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.searchRestaurantsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var searchRestaurantsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/search/restaurants').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(searchRestaurantsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var transactionPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/transaction').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
        
        var transactionPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/transaction').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.transactionOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var transactionOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/transaction').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(transactionOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
