
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Enum } from '@/utils'

// confirm password component
export default function ConfirmPassword(props) {
    const { value, password, onChange } = props;
    const [feedback, setFeedback] = useState(Enum.INIT);

    const FeedbackTxt = {
        [Enum.INIT]: '',
        [Enum.GOOD]: 'Looks Good!',
        [Enum.REQUIRED]: `Please Enter Confirm Password!`,
        [Enum.WARN]: `Please Enter Password First!`,
        [Enum.ERROR]: `Please Enter A Same Password!`,
    }

    // handle value valid or not 
    const handleValid = () => {
        if (!password) {
            return setFeedback(Enum.WARN)
        }
        if (!value) {
            return setFeedback(Enum.REQUIRED)
        }
        if (value !== password) {
            return setFeedback(Enum.ERROR)
        }
    }

    const handleValueChange = (event) => {
        const { value } = event.target;
        handleValid(value)
        if (onChange) {
            onChange(value)
        }
    }
    const invalid = /required|error|warn/.test(feedback);

    return (
        <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control isInvalid={invalid} required type="password" placeholder="Enter Confirm Password" onChange={handleValueChange} value={value} />
            <Form.Control.Feedback type={invalid ? 'invalid' : 'valid'}>{FeedbackTxt[feedback]}</Form.Control.Feedback>
        </Form.Group>
    )
}