import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormGroup,
  FormLabel
} from "@material-ui/core";
import React from "react";
import * as yup from "yup";
import { RequestError } from "../models/RequestError";
import { SaveUserDto } from "../models/SaveUserDto";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";
import { Message } from "./Message";
import { Switch } from "./Switch";

/**
 * User Form Modal Props
 */
interface Props {
  /**
   * Auto focus on the first field
   */
  autoFocus?: boolean;

  /**
   * Modal Title
   */
  title: React.ReactNode;

  /**
   * Modal Subtitle
   */
  subtitle: React.ReactNode;

  /**
   * Submit button Label
   */
  submitLabel: React.ReactNode;

  /**
   * Form initial values
   */
  initialValues?: SaveUserDto;

  /**
   * Whether request is in progress
   */
  loading?: boolean;

  /**
   * Form errors
   */
  error?: RequestError<SaveUserDto>;

  /**
   * Callback invoked on successful form submission
   */
  onSubmit: (values: SaveUserDto) => void;

  /**
   * Callback invoked on modal dismissal
   */
  onCancel: () => void;
}

/**
 * User form validation schema
 */
const validationSchema = yup.object<SaveUserDto>().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().min(6),
  isUser: yup.boolean(),
  isOwner: yup.boolean(),
  isAdmin: yup.boolean()
});

/**
 * Initial user form values
 */
const defaultValues = {
  name: "",
  email: "",
  password: "",
  isUser: false,
  isOwner: false,
  isAdmin: false
};

/**
 * User Form Modal
 *
 * Displays a dialog for creating or editing a user.
 */
export const UserFormModal: React.SFC<Props> = ({
  autoFocus,
  loading,
  title,
  subtitle,
  submitLabel,
  error,
  onSubmit,
  onCancel,
  initialValues = defaultValues
}) => (
  <AdaptiveModal open={true} onClose={onCancel}>
    <Form
      onlyChanged={true}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      errors={error && error.details}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        {error && <Message error={error} />}
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Roles</FormLabel>
          <FormGroup row={true}>
            <Field component={Switch} id="isUser" name="isUser" label="User" />
            <Field
              component={Switch}
              id="isOwner"
              name="isOwner"
              label="Owner"
            />
            <Field
              component={Switch}
              id="isAdmin"
              name="isAdmin"
              label="Admin"
            />
          </FormGroup>
        </FormControl>
        <Field
          component={Input}
          autoFocus={autoFocus}
          id="name"
          name="name"
          label="Display Name"
        />
        <Field
          component={Input}
          type="email"
          id="email"
          name="email"
          label="Email Address"
        />
        <Field
          component={Input}
          type="password"
          id="password"
          name="password"
          label="Password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" color="primary" loading={loading}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Form>
  </AdaptiveModal>
);
