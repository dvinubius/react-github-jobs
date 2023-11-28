import React from "react";
import { Form, Col } from "react-bootstrap";
import SearchParams from "./models/search_params.model";

export interface SearchFormProps {
  params: SearchParams;
  onParamChange: (paramName: string, newVal: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  params,
  onParamChange,
}) => {
  const handleParamChangeText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const param = event.target.name;
    const value = event.target.value;
    onParamChange(param, value);
  };
  const handleParamChangeCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const param = event.target.name;
    const value = event.target.checked.toString();
    onParamChange(param, value);
  };

  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={handleParamChangeText}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={handleParamChangeText}
            value={params.location}
            name="location"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check
            onChange={handleParamChangeCheck}
            value={params.full_time}
            name="full_time"
            id="full-time"
            label="Only Full Time"
            type="checkbox"
            className="mb-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};
