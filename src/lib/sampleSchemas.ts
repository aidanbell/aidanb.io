import type { FormDefinition } from '@aidanbell/schema-form';

type SampleSchema = {
  id: string;
  label: string;
  schema: FormDefinition;
};

export const sampleSchemas: SampleSchema[] = [
  {
    id: 'signup',
    label: 'User signup',
    schema: {
      schemaVersion: 1,
      title: 'User signup',
      description: 'Create an account to get started.',
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
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
          minLength: 8,
          description: 'At least 8 characters.',
        },
        {
          name: 'role',
          type: 'select',
          label: 'Role',
          required: true,
          options: [
            { label: 'Viewer', value: 'viewer' },
            { label: 'Editor', value: 'editor' },
            { label: 'Admin', value: 'admin' },
          ],
          defaultValue: 'viewer',
        },
        {
          name: 'newsletter',
          type: 'boolean',
          label: 'Subscribe to newsletter',
          description: 'Occasional product updates. No spam.',
        },
      ],
    },
  },
  {
    id: 'feedback',
    label: 'Product feedback',
    schema: {
      schemaVersion: 1,
      title: 'Product feedback',
      description: 'Tell us what is working and what is not.',
      fields: [
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
          required: true,
          min: 1,
          max: 5,
          description: '1 (poor) to 5 (excellent).',
        },
        {
          name: 'category',
          type: 'radio',
          label: 'Category',
          required: true,
          options: [
            { label: 'Bug', value: 'bug' },
            { label: 'Feature', value: 'feature' },
            { label: 'Other', value: 'other' },
          ],
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
    id: 'validation',
    label: 'Validation & defaults',
    schema: {
      schemaVersion: 1,
      title: 'Workspace settings',
      description:
        'Shows pattern validation, default values, and disabled fields.',
      fields: [
        {
          name: 'workspaceId',
          type: 'string',
          label: 'Workspace ID',
          defaultValue: 'ws_8f3k2m',
          disabled: true,
          description: 'Assigned automatically and cannot be changed.',
        },
        {
          name: 'slug',
          type: 'string',
          label: 'URL slug',
          required: true,
          pattern: '^[a-z0-9-]+$',
          placeholder: 'my-workspace',
          description: 'Lowercase letters, numbers, and dashes only.',
        },
        {
          name: 'plan',
          type: 'radio',
          label: 'Plan',
          required: true,
          options: [
            { label: 'Free', value: 'free' },
            { label: 'Pro', value: 'pro' },
            { label: 'Enterprise', value: 'enterprise' },
          ],
          defaultValue: 'pro',
        },
        {
          name: 'seats',
          type: 'number',
          label: 'Seats',
          required: true,
          min: 1,
          max: 99,
          defaultValue: 5,
        },
        {
          name: 'terms',
          type: 'boolean',
          label: 'I accept the terms of service',
          required: true,
          description: 'Required booleans must be checked to submit.',
        },
      ],
    },
  },
  {
    id: 'kitchen-sink',
    label: 'Kitchen sink',
    schema: {
      schemaVersion: 1,
      title: 'Kitchen sink',
      description: 'Every supported field type in one form.',
      fields: [
        {
          name: 'text',
          type: 'string',
          label: 'String',
          placeholder: 'Plain text',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'you@example.com',
        },
        { name: 'secret', type: 'password', label: 'Password' },
        { name: 'amount', type: 'number', label: 'Number', min: 0, max: 100 },
        { name: 'agree', type: 'boolean', label: 'Boolean' },
        {
          name: 'flavor',
          type: 'select',
          label: 'Select',
          options: [
            { label: 'Vanilla', value: 'vanilla' },
            { label: 'Chocolate', value: 'chocolate' },
            { label: 'Strawberry', value: 'strawberry' },
          ],
        },
        {
          name: 'size',
          type: 'radio',
          label: 'Radio',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Textarea',
          placeholder: 'Longer free-form text...',
        },
      ],
    },
  },
];

const firstSample = sampleSchemas[0];

if (!firstSample) {
  throw new Error('sampleSchemas must include at least one schema');
}

export const defaultSchemaText = JSON.stringify(firstSample.schema, null, 2);
