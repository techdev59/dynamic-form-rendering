import { useEffect, useState } from "react";
import {
    fetchFormHandler,
    sendFromDataHandler,
} from "../../utils/network/services/homePageServices";
import { Button, Checkbox, Typography } from "@mui/material";
import { FormConatiner } from "../../components/UI/FormContainer";
import { FormFieldContainer } from "../../components/UI/FormFieldContainer";
import { FormInput } from "../../components/UI/FormInput";
import {
    checkBoxFieldTypes,
    dateTimeFieldTypes,
    numberFieldTypes,
    textFieldTypes,
} from "../../lib/constants/FormConstants";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormDateTimePicker } from "../../components/UI/FormDateTimePicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Home() {
    const [formData, setFormData] = useState(null);
    const [defaultValues, setDefaultValues] = useState({});
    const [successResponse, setSuccessResponse] = useState(null);

    const schema = yup.object().shape(
        Object.keys(defaultValues).reduce((acc, key) => {
            return { ...acc, [key]: yup.string().default(defaultValues[key]) };
        }, {})
    );

    const { control, handleSubmit, reset } = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        fetchFormHandler(setFormData, setDefaultValues);
    }, []);

    const submitForm = (data, e) => {
        e.preventDefault();
        const reuiredFormFields = formData.filter((field) => field.Null === "NO");
        let errorFields = [];
        for (let formField in data) {
            for (let requiredField of reuiredFormFields) {
                if (requiredField.Field === formField && data[formField] == "") {
                    errorFields.push(formField);
                }
            }
        }
        if (errorFields.length > 0) {
            alert(` The fields ${errorFields.join(",")} must have an entry.`);
        } else {
            let formData = [];
            for (let formField in data) {
                const formObject = {
                    Field: formField,
                    Value: data[formField],
                };
                formData.push(formObject);
            }
            sendFromDataHandler(formData, reset, setSuccessResponse);
        }
    };

    return (
        <>
            {formData ? (
                <FormConatiner>
                    {successResponse ? (
                        <>
                            <Typography>{successResponse}</Typography>
                            <Button sx={{ marginTop: "10px" }} variant="contained" onClick={() => setSuccessResponse(null)}>Back to form</Button>
                        </>
                    ) : (
                        <form
                            style={{ width: "100%" }}
                            onSubmit={handleSubmit((data, e) => submitForm(data, e))}
                        >
                            {formData.map((field, index) => {
                                return (
                                    <FormFieldContainer key={index}>
                                        <Typography>{field.Field}</Typography>
                                        <Controller
                                            name={field.Field}
                                            control={control}
                                            rules={{ required: field.Null === "NO" }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <>
                                                    {textFieldTypes.includes(
                                                        field.Type.split("(")[0]
                                                    ) && (
                                                            <FormInput
                                                                value={value}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                type={
                                                                    numberFieldTypes.includes(
                                                                        field.Type.split("(")[0]
                                                                    ) && "number"
                                                                }
                                                            />
                                                        )}
                                                    {checkBoxFieldTypes.includes(field.Type) && (
                                                        <Checkbox
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                        />
                                                    )}
                                                    {dateTimeFieldTypes.includes(field.Type) && (
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <FormDateTimePicker
                                                                value={value}
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                            />
                                                        </LocalizationProvider>
                                                    )}
                                                </>
                                            )}
                                        />
                                    </FormFieldContainer>
                                );
                            })}
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </form>
                    )}
                </FormConatiner>
            ) : null}
        </>
    );
}

export default Home;
