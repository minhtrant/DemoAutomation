/// <reference types="cypress" />

import { ProfilesManagementHelper } from "../../support/api-helpers/profiles-management-helper"

describe('Test suite - Profiles management', function () {
    it('get the profile details by user ID', function () {
        let observedBody;

        cy.fixture("api/existing-profile").then(existingProfile => {
            ProfilesManagementHelper.getUser(existingProfile.userId);
            cy.get('@getResponse').then(getResponse => {
                expect(getResponse.status).to.eq(200);
                expect(getResponse.statusText).to.eq('OK');

                observedBody = JSON.parse(getResponse.body);
                expect(observedBody.userId).to.eq(existingProfile.userId);
                expect(observedBody.username).to.eq(existingProfile.username);
                expect(observedBody.dateOfBirth).to.eq(existingProfile.dateOfBirth);
                expect(observedBody.gender).to.eq(existingProfile.gender);
                expect(observedBody.subscribedMarketing).to.eq(existingProfile.subscribedMarketing);
            })
        })
    })


    it('create new profile', function () {
        let observedBody;
        let createdProfileId = 0;

        cy.fixture("api/add-profile").then(profileInfo => {
            let createdProfileUsername = profileInfo.username;
            let createdProfileDateOfBirth = profileInfo.dateOfBirth;
            let createdProfileGender = profileInfo.gender;
            let createdProfileSubscribed = profileInfo.subscribedMarketing;

            ProfilesManagementHelper.addProfile(profileInfo);
            cy.get('@postResponse').then(postResponse => {
                expect(postResponse.status).to.eq(201);
                expect(postResponse.statusText).to.eq('Created');
                expect(postResponse.body.userId).to.eq(222);

                createdProfileId = postResponse.body.userId;
                ProfilesManagementHelper.getUser(createdProfileId);
                cy.get('@getResponse').then(getResponse => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.statusText).to.eq('OK');

                    observedBody = JSON.parse(getResponse.body);
                    expect(observedBody.userId).to.eq(createdProfileId);
                    expect(observedBody.username).to.eq(createdProfileUsername);
                    expect(observedBody.dateOfBirth).to.eq(createdProfileDateOfBirth);
                    expect(observedBody.gender).to.eq(createdProfileGender);
                    expect(observedBody.subscribedMarketing).to.eq(createdProfileSubscribed);
                })

            })
        });
    })
})