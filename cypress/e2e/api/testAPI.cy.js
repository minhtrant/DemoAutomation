/// <reference types="cypress" />

import { ProfilesManagementHelper } from "../../support/api-helpers/profiles-management-helper"

describe('Test suite - Profiles management', function () {
    it('verify that the user is able to get profile details by user ID', function () {
        let observedBody;

        cy.fixture("api/existing-profile").then(existingProfile => {
            ProfilesManagementHelper.getUser(existingProfile.userId);
            cy.get('@getResponse').then(getResponse => {
                // Verify the response code and response message
                expect(getResponse.status).to.eq(200);
                expect(getResponse.statusText).to.eq('OK');

                // Verify response body 
                observedBody = JSON.parse(getResponse.body);
                expect(observedBody.userId).to.eq(existingProfile.userId);
                expect(observedBody.username).to.eq(existingProfile.username);
                expect(observedBody.dateOfBirth).to.eq(existingProfile.dateOfBirth);
                expect(observedBody.gender).to.eq(existingProfile.gender);
                expect(observedBody.subscribedMarketing).to.eq(existingProfile.subscribedMarketing);
                expect(observedBody.hasSetupPreference).to.be.null;
            })
        })
    })


    it('verify that the user is able to create new profile successfully with full info', function () {
        let observedBody;

        cy.fixture("api/add-valid-profile").then(profileInfo => {
            let createdProfileUsername = profileInfo.fullProfileInfo.username;
            let createdProfileDateOfBirth = profileInfo.fullProfileInfo.dateOfBirth;
            let createdProfileGender = profileInfo.fullProfileInfo.gender;
            let createdProfileSubscribed = profileInfo.fullProfileInfo.subscribedMarketing;

            // Create new profile
            ProfilesManagementHelper.addProfile(profileInfo.fullProfileInfo);
            cy.get('@postResponse').then(postResponse => {
                // Verify the response code and response message
                expect(postResponse.status).to.eq(201);
                expect(postResponse.statusText).to.eq('Created');

                let createdProfileId = postResponse.body.userId;
                // Get created user profile
                ProfilesManagementHelper.getUser(createdProfileId);
                cy.get('@getResponse').then(getResponse => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.statusText).to.eq('OK');

                    // Verify response body after created
                    observedBody = JSON.parse(getResponse.body);
                    expect(observedBody.userId).to.eq(createdProfileId);
                    expect(observedBody.username).to.eq(createdProfileUsername);
                    expect(observedBody.dateOfBirth).to.eq(createdProfileDateOfBirth);
                    expect(observedBody.gender).to.eq(createdProfileGender);
                    expect(observedBody.subscribedMarketing).to.eq(createdProfileSubscribed);
                    expect(observedBody.hasSetupPreference).to.be.null;
                })

            })
        });
    })

    it('verify that the user is able to create new profile successfully with required info only', function () {
        let observedBody;

        cy.fixture("api/add-valid-profile").then(profileInfo => {
            let createdProfileUsername = profileInfo.requiredOnlyProfileInfo.username;
            let createdProfileDateOfBirth = profileInfo.requiredOnlyProfileInfo.dateOfBirth;

            // Create new profile
            ProfilesManagementHelper.addProfile(profileInfo.requiredOnlyProfileInfo);
            cy.get('@postResponse').then(postResponse => {
                // Verify the response code and response message
                expect(postResponse.status).to.eq(201);
                expect(postResponse.statusText).to.eq('Created');

                let createdProfileId = postResponse.body.userId;
                // Get created user profile
                ProfilesManagementHelper.getUser(createdProfileId);
                cy.get('@getResponse').then(getResponse => {
                    expect(getResponse.status).to.eq(200);
                    expect(getResponse.statusText).to.eq('OK');

                    // Verify response body after created
                    observedBody = JSON.parse(getResponse.body);
                    expect(observedBody.userId).to.eq(createdProfileId);
                    expect(observedBody.username).to.eq(createdProfileUsername);
                    expect(observedBody.dateOfBirth).to.eq(createdProfileDateOfBirth);
                    expect(observedBody.gender).to.be.null;
                    expect(observedBody.subscribedMarketing).to.be.null;
                    expect(observedBody.hasSetupPreference).to.be.null;
                })
            })
        });
    })

    it('verify that user is not able to create new profile with missing username value', function () {
        cy.fixture("api/add-invalid-profile").then(profileInfo => {
            // Create new profile
            ProfilesManagementHelper.addProfile(profileInfo.missingUsernameProfile);
            cy.get('@postResponse').then(postResponse => {
                // Verify the response code and response message
                expect(postResponse.status).to.eq(405);
                expect(postResponse.statusText).to.eq('Method Not Allowed');
                expect(postResponse.body).to.eq('The username field is missing - Cannot created the profile');
            })
        });
    })

    it('Verify that user is not able to create new profile with missing date of birth value', function () {
        cy.fixture("api/add-invalid-profile").then(profileInfo => {
            // Create new profile
            ProfilesManagementHelper.addProfile(profileInfo.missingDateOfBirthProfile);
            cy.get('@postResponse').then(postResponse => {
                // Verify the response code and response message
                expect(postResponse.status).to.eq(405);
                expect(postResponse.statusText).to.eq('Method Not Allowed');
                expect(postResponse.body).to.eq('The dateOfBirth field is missing - Cannot created the profile');
            })
        });
    })
})