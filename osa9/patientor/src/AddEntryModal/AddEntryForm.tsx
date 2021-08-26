import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, Type, TypeOption, NumberField} from "./FormField";
import { NewEntries } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddEntryModal/FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */


interface Props {
  onSubmit: (values: NewEntries) => void;
  onCancel: () => void;
}


const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: Type.HealthCheck, label: "HealthCheck" }
];



export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {

  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        type: "HealthCheck",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if(values.type === "HealthCheck"){
          if(!values.healthCheckRating){
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}/>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
