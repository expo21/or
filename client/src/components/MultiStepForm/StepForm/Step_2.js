import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import PantImage from "../../../images/pants.jpg";

export default function Step_2({ formData, setForm, navigation, progress }) {
  const [error, setError] = useState("");
  const [APIdata, setAPIdata] = useState([]);

  useEffect(() => {
    progress(25);

    axios
      .get(
        `http://localhost:3232/api/garmentsByGender/${formData.step_1.gender}`
      )
      .then((result) => {
        let response = result.data.data;
        setAPIdata(response);
      });
  }, []);

  //next function
  const nextFunction = () => {
    if (formData.step_2.garment_type) {
      // setError("");
      navigation.next();
    } else {
      setError("Please Choose Grament Type.");
    }
  };

  //choseCloth
  const chooseCloth = (e) => {
    console.log(e.target.value);
    setForm(e);
  };

  return (
    <div>
      <h3 className="step_heading">Choose your clothes</h3>
      <div className="selection_wrap gender-wrap">
        {APIdata.map((i, index) => {
          return (
            <div key={index} className="radio">
              <input
                id={i.title}
                type="radio"
                value={i.title}
                name="step_2.garment_type"
                checked={formData.step_2.garment_type === i.title}
                onChange={(e) => chooseCloth(e)}
              />{" "}
              {/* {i.value} */}
              <label
                htmlFor={i.title}
                style={{ backgroundImage: `url(${PantImage})` }}
              >
                {i.title} <div className="overley" />
              </label>
            </div>
          );
        })}
      </div>
      <div className="step_form-wrapper">
        <div className="form_footer">
          {error && formData.step_2.garment_type === "" ? <p>{error}</p> : null}
          <Button onClick={() => navigation.previous()}>Back</Button>
          <Button onClick={() => nextFunction()}>Next</Button>
        </div>
      </div>
    </div>
  );
}
