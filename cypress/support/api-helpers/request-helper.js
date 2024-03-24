/// <reference types="cypress" />

export const RequestHelper = {
    sendGetRequest(endPoint, headers) {
        cy.request({
            method: 'GET',
            url: endPoint,
            headers: headers,
            failOnStatusCode: false
        }).then(response => {
            cy.wrap(response).as('getResponse');
        })
    },

    sendPostRequest(endPoint, headers, body) {
        cy.request({
            method: 'POST',
            url: endPoint,
            headers: headers,
            body: body,
            failOnStatusCode: false,
        }).then(response => {
            cy.wrap(response).as('postResponse');
        })
    },

    sendPutRequest(endPoint, headers, body) {
        cy.request({
            method: 'PUT',
            url: endPoint,
            headers: headers,
            body: body,
            failOnStatusCode: false,
        }).then(response => {
            cy.wrap(response).as('putResponse');
        })
    },

    sendPatchRequest(endPoint, headers, body) {
        cy.request({
            method: 'PATCH',
            url: endPoint,
            headers: headers,
            body: body,
            failOnStatusCode: false
        }).then(response => {
            cy.wrap(response).as('patchResponse');
        })
    },

    sendDeleteRequest(endPoint, headers, body) {
        cy.request({
            method: 'DELETE',
            url: endPoint,
            headers: headers,
            body: body,
            failOnStatusCode: false,
        }).then(response => {
            cy.wrap(response).as('deleteResponse');
        })
    }
}