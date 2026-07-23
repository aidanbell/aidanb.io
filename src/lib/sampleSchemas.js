export const sampleSchemas = [
  {
    id: 'signup',
    label: 'User signup',
    schema: {
      title: 'User signup',
      fields: [
        {
          name: 'fullName',
          type: 'string',
          label: 'Full name',
          required: true,
          minLength: 2,
          placeholder: 'Jane Doe',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true,
          placeholder: 'jane@example.com',
        },
        {
          name: 'role',
          type: 'select',
          label: 'Role',
          required: true,
          options: ['viewer', 'editor', 'admin'],
        },
        {
          name: 'newsletter',
          type: 'boolean',
          label: 'Subscribe to newsletter',
        },
      ],
    },
  },
  {
    id: 'feedback',
    label: 'Product feedback',
    schema: {
      title: 'Product feedback',
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
          required: true,
          min: 1,
          max: 5,
        },
        {
          name: 'category',
          type: 'select',
          label: 'Category',
          required: true,
          options: ['bug', 'feature', 'other'],
        },
        {
          name: 'comments',
          type: 'textarea',
          label: 'Comments',
          required: true,
          minLength: 10,
          maxLength: 500,
          placeholder: 'Tell us more...',
        },
      ],
    },
  },
  {
    id: 'event',
    label: 'Event registration',
    schema: {
      title: 'Event registration',
      fields: [
        {
          name: 'attendeeName',
          type: 'string',
          label: 'Attendee name',
          required: true,
        },
        {
          name: 'ticketCount',
          type: 'number',
          label: 'Tickets',
          required: true,
          min: 1,
          max: 10,
        },
        {
          name: 'dietaryNotes',
          type: 'textarea',
          label: 'Dietary restrictions',
          maxLength: 200,
          placeholder: 'Optional',
        },
      ],
    },
  },
];

export const defaultSchemaText = JSON.stringify(sampleSchemas[0].schema, null, 2);
