import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "./Button";
import { FormControl, FormikForm, FormError } from "./Form";
import { Formik } from "formik";
import * as yup from "yup";

interface Props {
  show: boolean;
  type: string;
  handleClose: Function;
  handleSubmit: Function;
  initialValue: string;
}

const UpdateFieldModal: React.FC<Props> = ({
  show,
  handleClose,
  handleSubmit,
  type,
  initialValue,
}) => {
  const fieldValidationSchema = yup.object().shape({
    value: yup.string().required(`The ${type.toLowerCase()} can't be empty.`),
  });

  return (
    <Formik
      initialValues={{ value: initialValue }}
      onSubmit={({ value }) => {
        handleSubmit(value);
      }}
      validationSchema={fieldValidationSchema}
    >
      {() => (
        <Modal show={show} onHide={handleClose}>
          <FormikForm>
            <Modal.Header closeButton>
              <Modal.Title>Update {type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormControl type="text" name="value" />
              <FormError name="value" component="p" className="text-danger" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="cancel" onClick={() => handleClose()}>
                Close
              </Button>
              <Button type="submit">Update {type}</Button>
            </Modal.Footer>
          </FormikForm>
        </Modal>
      )}
    </Formik>
  );
};

export default UpdateFieldModal;
