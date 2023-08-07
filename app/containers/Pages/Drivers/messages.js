/*
 * Blank Page Messages
 *
 * This contains all the text for the Blank Page.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.clients';

export default defineMessages({


  paperTitle: {
    id: `${scope}.paperTitle`,
    defaultMessage: 'List all clients ',
  },
  createClient: {
    id: `${scope}.createClient`,
    defaultMessage: 'Create Client',
  },
  editClient: {
    id: `${scope}.editClient`,
    defaultMessage: 'Edit Client',
  },

  continueCreate: {
    id: `${scope}.continueCreate`,
    defaultMessage: 'Create',
  },

});
