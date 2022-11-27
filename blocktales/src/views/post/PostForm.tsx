import React from 'react';

import { FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Radio, RadioGroup } from '@chakra-ui/react';
import { Formik, Form } from 'formik'

export const PostForm = ({ onSubmit } : { onSubmit: () => void}) => {
  const [input, setInput] = React.useState('')
  const handleInputChange = (e) => setInput(e.target.value)

  const isError = input === ''
  return (
    <Formik
      initialValues={{ }}
      onSubmit={(values, actions) => {

        onSubmit()
      }}
    >
      <Form>
        <FormControl>
          <FormLabel style={{ color :"white"}}>Transaction</FormLabel>
          <Input  style={{ backgroundColor: '#d5d5d59e' }} type='email' value={input} onChange={handleInputChange} />
          {isError && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl style={{ marginTop: '14px'}}>
          <FormLabel style={{color: "white"}}>Comment</FormLabel>
          <Input style={{ height: "400px", backgroundColor: '#d5d5d59e' }} type='text' htmlSize={50} value={input} onChange={handleInputChange} />
          {isError && (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
      </Form>
    </Formik>
  );
}