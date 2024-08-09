export function Validation(values)
{
    const errors ={}

    const email_pattern = /^[^\s@] + @[^\s@]+\.[^\s@]{2,6}$/;

    if(values.name === "")
        {
            errors.name = "Name is a required field. "
        }


    if(values.email === "")
    {
        errors.email = "Email is a required field."
    }
    else if(!email_pattern.test(values.email))
    {
        errors.email = "E-mail is incorrect."
    }
    if(values.phone === "")
        {
            errors.phone = "Phone  is a required field. "
        }

    return errors;
    
}