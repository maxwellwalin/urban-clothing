import { useState, useEffect } from 'react'

export default function useForm(initialState = {}) {
    const [inputs, setInputs] = useState(initialState);

    useEffect(() => {
        setInputs(initialState)
    }, [initialState])

    function handleChange(e) {
        let { value, name, type, files } = e.target;

        if(type === 'number') {
            value = parseInt(value);
        }

        if(type === 'file') {
            [value] = files;
        }

        setInputs({
            ...inputs,
            [name]: value,
        })
    }

    function resetForm() {
        setInputs(initialState);
    }

    function clearForm() {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, '']));
        setInputs(blankState);
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm
    }
}
