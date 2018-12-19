import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import Input from './input';
import { required, exactlyFive, notEmpty, isANumber } from '../validators';


export class ComplaintForm extends React.Component {
  onSubmit(values) {
    return fetch(`/api/report`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok) {
          if (
              res.headers.has('content-type') && 
              res.headers
              .get('content-type')
              .startsWith('application/json')
          ) {
            return res.json().then(err => Promise.reject(err));
          }
          return Promise.reject({
            code: res.status,
            message: res.statusText
          });
        }
        return;
      })
      .then(() => console.log('Submitted with values', values))
      .catch(err => {
        const { reason, message, location } = err;
        if (reason === 'ValidationError') {
          return Promise.reject(
            new SubmissionError({
              [location]: message
            })
          );
          }
          return Promise.reject(
            new SubmissionError({
              _error: message
            })
          );
      });
  }


  render() {
    return (
      <div className="complaint-form">
        <h2>Report a Problem with Your Delivery</h2>
        <form className="complaint">
          <label>Tracking Number</label><br/>
          <Field 
            name="trackingNumber"
            id="trackingNumber"
            label="Tracking Number"
            component="input"
            validate={[required, exactlyFive, notEmpty, isANumber]}
            /><br/>
          <label>What is your issue?</label><br/>
          <Field
            name="issue"
            id="issue"
            label="What is your issue?"
            component="select">
              <option value="not-delivered">My delivery hasn't arrived</option>
              <option value="wrong-item">The wrong item was delivered</option>
              <option value="missing-item">Part of my order was missing</option>
              <option value="damaged-item">Some of my order arrived damaged</option>
              <option value="other">Other (see comments below)</option>
            </Field><br/>
          <label>Give More Details (optional)</label><br/>
          <Field 
            name="moreDetail"
            id="moreDetail"
            label="Give More Details (optional)"
            component="input"  
            /><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'complaint'
})(ComplaintForm);