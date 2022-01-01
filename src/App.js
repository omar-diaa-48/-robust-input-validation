import { Button, Container, FormControl, FormControlLabel, FormLabel, makeStyles, Radio, RadioGroup, TextField, Typography } from "@material-ui/core"
import { KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles(() => {
  return {
    container:{
      padding:'2em'
    },
    field:{
      display:'block',
      marginTop:'1em',
      marginBottom:'1em'
    }
  }
})

function App() {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    name:{
      value:'',
      error:false,
      errorMessage:'You must enter a name'
    },
    age:{
      value:21,
      error:false,
      errorMessage:'You must enter an age'
    },
    likes:{
      value:'',
      error:false,
      errorMessage:'You must enter your liked tech stacks'
    },
    jobTitle:{
      value:'full-stack',
      error:false,
      errorMessage:'You must choose your job title'
    }
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]:{
        ...formValues[name],
        value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = {...formValues}

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if(currentValue === ''){
        newFormValues = {
          ...newFormValues,
          [currentField]:{
            ...newFormValues[currentField],
            error:true
          }
        }
      }
      
    }

    setFormValues(newFormValues)
  }

  return (
    <Container className={classes.container} >
      <form noValidate onSubmit={handleSubmit} >
          <Typography 
            variant="h6">
              Please enter your data
          </Typography>

          <TextField 
            placeholder="Enter your name"
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            required
            className={classes.field}
            value={formValues.name.value}
            onChange={handleChange}
            error={formValues.name.error}
            helperText={formValues.name.error && formValues.name.errorMessage}
          />

          <TextField 
            placeholder="Enter your age"
            label="Age"
            name="age"
            variant="outlined"
            fullWidth
            required
            type="number"
            className={classes.field}
            value={formValues.age.value}
            onChange={handleChange}
            error={formValues.age.error}
            helperText={formValues.age.error && formValues.age.errorMessage}
            />

          <TextField 
            placeholder="Describe the best tech stack you worked with and you like most?"
            label="Likes"
            name="likes"
            variant="outlined"
            fullWidth
            required
            className={classes.field}
            value={formValues.likes.value}
            multiline
            rows={4}
            onChange={handleChange}
            error={formValues.likes.error}
            helperText={formValues.likes.error && formValues.likes.errorMessage}
          />
          
          <FormControl className={classes.field} >
            <FormLabel>Job title</FormLabel>
            <RadioGroup name="jobTitle" value={formValues.jobTitle.value} onChange={handleChange} >
              <FormControlLabel value="full-stack" control={<Radio />} label="Full stack" />
              <FormControlLabel value="backend" control={<Radio />} label="Backend" />
              <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            endIcon={<KeyboardArrowRight />}
          >
              Submit
          </Button>
      </form>
    </Container>
  );
}

export default App;
