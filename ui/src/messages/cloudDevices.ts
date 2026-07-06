import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  // Existing messages
  pageTitle: { id: 'Mobitru.CloudDevices.pageTitle', defaultMessage: 'Cloud Devices' },
  allOrganizations: {
    id: 'Mobitru.CloudDevices.allOrganizations',
    defaultMessage: 'All Organizations',
  },
  exploreDevices: { id: 'Mobitru.CloudDevices.exploreDevices', defaultMessage: 'Explore Devices' },
  tabIos: { id: 'Mobitru.CloudDevices.tabIos', defaultMessage: 'iOS' },
  tabAndroid: { id: 'Mobitru.CloudDevices.tabAndroid', defaultMessage: 'Android' },
  platformFilterAriaLabel: {
    id: 'Mobitru.CloudDevices.platformFilterAriaLabel',
    defaultMessage: 'Device platform',
  },
  premiumDevices: {
    id: 'Mobitru.CloudDevices.premiumDevices',
    defaultMessage: 'Premium Devices',
  },
  availableDevices: {
    id: 'Mobitru.CloudDevices.availableDevices',
    defaultMessage: 'Available Devices',
  },
  noDevices: { id: 'Mobitru.CloudDevices.noDevices', defaultMessage: 'No devices found.' },
  documentation: { id: 'Mobitru.CloudDevices.documentation', defaultMessage: 'Documentation' },
  poweredByMobitru: {
    id: 'Mobitru.CloudDevices.poweredByMobitru',
    defaultMessage: 'Powered by',
  },

  // New messages for empty states
  // No Integration
  noIntegrationTitle: {
    id: 'Mobitru.CloudDevices.noIntegrationTitle',
    defaultMessage: 'No configuration yet',
  },
  noIntegrationDescription: {
    id: 'Mobitru.CloudDevices.noIntegrationDescription',
    defaultMessage: 'Your plugin is installed but not configured yet.',
  },
  noIntegrationDescriptionContinue: {
    id: 'Mobitru.CloudDevices.noIntegrationDescriptionContinue',
    defaultMessage: 'Go to settings to complete the setup.',
  },
  noIntegrationButtonSettings: {
    id: 'Mobitru.CloudDevices.noIntegrationButtonSettings',
    defaultMessage: 'Open settings',
  },
  noIntegrationButtonDocs: {
    id: 'Mobitru.CloudDevices.noIntegrationButtonDocs',
    defaultMessage: 'Documentation',
  },

  // Maintenance / Service Unavailable
  maintenanceTitle: {
    id: 'Mobitru.CloudDevices.maintenanceTitle',
    defaultMessage: "We're making things better!",
  },
  maintenanceDescription: {
    id: 'Mobitru.CloudDevices.maintenanceDescription',
    defaultMessage:
      'Currently Mobitru service is unavailable due to maintenance. It might take some time. We appreciate your patience.',
  },
  maintenanceButtonRefresh: {
    id: 'Mobitru.CloudDevices.maintenanceButtonRefresh',
    defaultMessage: 'Refresh page',
  },
  maintenanceSocialsLabel: {
    id: 'Mobitru.CloudDevices.maintenanceSocialsLabel',
    defaultMessage: 'Check our socials for updates!',
  },

  // Social Icons
  socialSlack: { id: 'Mobitru.CloudDevices.socialSlack', defaultMessage: 'Slack' },
  socialX: { id: 'Mobitru.CloudDevices.socialX', defaultMessage: 'X' },
  socialLinkedIn: { id: 'Mobitru.CloudDevices.socialLinkedIn', defaultMessage: 'LinkedIn' },
  socialYouTube: { id: 'Mobitru.CloudDevices.socialYouTube', defaultMessage: 'YouTube' },
  socialGitHub: { id: 'Mobitru.CloudDevices.socialGitHub', defaultMessage: 'GitHub' },
});
