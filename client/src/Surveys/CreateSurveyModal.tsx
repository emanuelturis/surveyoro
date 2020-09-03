import React from "react";
import { Modal, Form } from "react-bootstrap";
import { FormControl, FormError } from "../Shared/Form";
import { Button } from "../Shared/Button";
import { Form as FormikForm, Formik } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";

interface Props {
  show: boolean;
  handleClose: Function;
}

const CREATE_SURVEY = gql`
  mutation CreateSurvey($name: String!) {
    createSurvey(name: $name) {
      id
      name
      active
    }
  }
`;

const CreateSurveyModal: React.FC<Props> = ({ show, handleClose }) => {
  const createSurveySchema = yup.object().shape({
    name: yup.string().required("New survey's name is required."),
  });

  const [createSurvey] = useMutation(CREATE_SURVEY, {
    update: (cache, response) => {
      const data: any = cache.readQuery({
        query: gql`
          query User {
            user {
              id
              firstName
              lastName
              email
              surveys {
                id
                name
                active
              }
            }
          }
        `,
      });

      cache.writeQuery({
        query: gql`
          query User {
            user {
              id
              firstName
              lastName
              email
              surveys {
                id
                name
                active
              }
            }
          }
        `,
        data: {
          user: {
            ...data.user,
            surveys: [response.data.createSurvey, ...data.user.surveys],
          },
        },
      });
    },
  });

  return (
    <div>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={({ name }, { resetForm }) => {
          createSurvey({ variables: { name } })
            .then(() => {
              handleClose();
              resetForm();
            })
            .catch(() => {
              handleClose();
              resetForm();
            });
        }}
        validationSchema={createSurveySchema}
      >
        {({ isSubmitting, isValid, dirty, resetForm }) => (
          <Modal
            show={show}
            onHide={() => {
              handleClose();
              resetForm();
            }}
          >
            <FormikForm>
              <Modal.Header closeButton>
                <Modal.Title>Create New Survey</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Label>Name</Form.Label>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Enter your new survey's name..."
                />
                <FormError name="name" component="p" className="text-danger" />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  size="medium"
                  onClick={() => {
                    handleClose();
                    resetForm();
                  }}
                  type="button"
                  variant="cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="medium"
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  Create New Survey
                </Button>
              </Modal.Footer>
            </FormikForm>
          </Modal>
        )}
      </Formik>
    </div>
  );
};

export default CreateSurveyModal;
