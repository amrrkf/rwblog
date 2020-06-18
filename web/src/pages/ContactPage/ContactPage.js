import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  useMutation,
  FormError
 } from '@redwoodjs/web'
import BlogLayout from "src/layouts/BlogLayout/BlogLayout";

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`;

const ContactPage = () => {

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your submission!')
    },
  });

  const onSubmit = (data) => {
    console.log(data)
    create({
      variables: { input: data}
    });
  }

  return <BlogLayout>
    <Form onSubmit={onSubmit} validation={{ mode: 'onBlur' }}>
      <FormError
        error={error}
        wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
      />
      <label htmlFor="name">Name</label>
      <TextField name="name" validation={{ required: true }} errorClassName="error" />
      <FieldError name="name" className="error"/>

      <label htmlFor="email">Email</label>
      <TextField name="email" validation={{ required: true }} errorClassName="error"/>
      <FieldError name="email" className="error"/>

      <label htmlFor="message">Message</label>
      <TextAreaField name="message" validation={{ required: true }} errorClassName="error"/>
      <FieldError name="message" className="error"/>
      <Submit disabled={loading}>Save</Submit>
    </Form>
  </BlogLayout>
}

export default ContactPage
