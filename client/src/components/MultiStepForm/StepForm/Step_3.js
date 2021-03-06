import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import axios from "axios";
// import { data_Step_3 as data } from "./data";
import PantImage from "../../../images/pants.jpg";
import { getStyleOptionsByGarmentType } from "../../../helper/helperFunctions";

export default function Step_3({ formData, setForm, navigation, progress }) {
  // formData.step_3.custom = {};
  const [checkBoxData, setCheckBoxData] = useState(new Map());
  const [checkedData, setCheckedData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [readyMade, setReadyMade] = useState([]);
  const [custom, setCustom] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  /////
  const onChecked = (e) => {
    try {
      checkBoxData.set(e.target.name, e.target.checked);

      let obj = e.target.value;
      if (checkedData.includes(obj)) {
        console.log("in");
        let checked = checkedData.filter((i) => {
          return i !== obj;
        });
        setCheckedData(checked);
      } else {
        console.log("out");
        checkedData.push(obj);
        setCheckedData(checkedData);
      }

      // update the state by creating a new Map
      setCheckBoxData(new Map(checkBoxData));
    } catch (error) {
      console.log(error);
    }

    // setCheckBoxData();
  };

  const fetchData = () => {
    getStyleOptionsByGarmentType(
      formData.step_2.garment_type,
      formData.step_1.gender
    ).then((data) => {
      if (data.length > 0) {
        let readyMade = data.filter((i) => i.custom === 0);
        setReadyMade(readyMade);
        let custom = data.filter((i) => i.custom === 1);
        setCustom(custom);
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }

      // setApiData(response.data.data);
    });
  };
  console.log({ formData });

  useEffect(() => {
    progress(50);
    // setCheckedData(formData.step_3.custom.Monogram_Position);
    fetchData();
    console.log({ formData });
  }, []);
  console.log(custom);

  return (
    <div>
      {showOptions ? (
        <div>
          {readyMade.map((i, index) => {
            return (
              <div key={index} className="step_form-wrapper">
                <h3 className="selection_subheading">{i.title}</h3>
                <div className="selection_wrap grid4col">
                  {i.options.map((j) => {
                    return (
                      <div key={j._id} className={j.input_type}>
                        <input
                          type={j.input_type}
                          id={j.title.toLowerCase()}
                          value={j.title.toLowerCase()}
                          name={`step_3.${i.title.toLowerCase()}`}
                          checked={
                            formData.step_3[i.title.toLowerCase()] ===
                            j.title.toLowerCase()
                          }
                          onChange={setForm}
                        />{" "}
                        <label
                          htmlFor={j.title.toLowerCase()}
                          style={{
                            backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/uploads/${j.image})`,
                          }}
                        >
                          {j.title} <div className="overley" />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="step_form-wrapper">
            <h3 className="selection_subheading">Choose Style</h3>
            <div className="selection_wrap grid4col">
              <div className="radio">
                <input
                  type="radio"
                  id="ready"
                  value="ready"
                  name={`step_3.garment_style`}
                  checked={formData.step_3.garment_style === "ready"}
                  onChange={setForm}
                />
                <label htmlFor="ready">
                  Ready Made <div className="overley" />
                </label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  id="custom"
                  value="custom"
                  name={`step_3.garment_style`}
                  checked={formData.step_3.garment_style === "custom"}
                  onChange={setForm}
                />{" "}
                <label htmlFor="custom">
                  Custom <div className="overley" />
                </label>
              </div>
            </div>
          </div>

          {formData.step_3.garment_style === "ready" && (
            <div className="step_form-wrapper">
              <h3 className="selection_subheading">Ready Style Number</h3>
              <div>
                <input
                  type="text"
                  value={formData.step_3.ready_style_number}
                  name="step_3.ready_style_number"
                  onChange={setForm}
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          {formData.step_3.garment_style === "custom" &&
            custom.map((i, index) => {
              return (
                <div key={index} className="step_form-wrapper">
                  <h3 className="selection_subheading">{i.title}</h3>
                  <div className="selection_wrap grid4col">
                    {i.options.map((j) => {
                      console.log({ j });
                      return (
                        <div key={j._id} className={j.input_type}>
                          <input
                            type={j.input_type}
                            id={j._id}
                            value={j.title}
                            name={`custom.${i.title
                              .toLowerCase()
                              .split(" ")
                              .join("_")}`}
                            onChange={setForm}
                            checked={
                              formData.custom[
                                i.title.toLowerCase().split(" ").join("_")
                              ] === j.title
                            }
                          />

                          <label
                            htmlFor={j._id}
                            style={{
                              backgroundImage: `url(${window.APIPATH}/uploads/${j.image})`,
                            }}
                          >
                            {j.title} <div className="overley" />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          <div className="step_form-wrapper">
            <div className="form_footer">
              <Button onClick={() => navigation.previous()}>Back</Button>
              <Button onClick={() => navigation.next()}>Next</Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>Nothing to show Please add Options </h3>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <div className="step_form-wrapper">
  //       <h3 className="selection_subheading">Fitting</h3>
  //       <div className="selection_wrap grid4col">
  //         {data[formData.step_2.garment_type].fitting.map((i) => {
  //           return (
  //             <div key={i} className="radio">
  // <input
  //   type="radio"
  //   id={i}
  //   value={i}
  //   name="step_3.fitting"
  //   checked={formData.step_3.fitting === i}
  //   onChange={setForm}
  // />{" "}
  // <label htmlFor={i}>{i}</label>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     <div className="step_form-wrapper">
  //       <h3 className="selection_subheading">Fabric</h3>
  //       <div className="selection_wrap grid4col">
  //         {data[formData.step_2.garment_type].fabric.map((i) => {
  //           return (
  //             <div key={i} className="radio">
  //               <input
  //                 type="radio"
  //                 id={i}
  //                 value={i}
  //                 name="step_3.fabric"
  //                 checked={formData.step_3.fabric === i}
  //                 onChange={setForm}
  //               />
  //               <label htmlFor={i}>{i}</label>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     {formData.step_2.garment_type !== "Denim Jacket" && (
  //       <div className="step_form-wrapper">
  //         <h3 className="selection_subheading">Choose Style</h3>
  //         <div className="selection_wrap ">
  //           {data[formData.step_2.garment_type].choose_style.map((i) => {
  //             return (
  //               <div key={i} className="radio">
  //                 <input
  //                   type="radio"
  //                   id={i}
  //                   value={i}
  //                   name="step_3.choose_style"
  //                   checked={formData.step_3.choose_style === i}
  //                   onChange={setForm}
  //                 />{" "}
  //                 <label htmlFor={i}>{i}</label>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}
  //     {formData.step_3.choose_style === "Ready Made Style" ? (
  // <div className="step_form-wrapper">
  //   <label>Ready Style Number</label>
  //   <div>
  //     <input
  //       label="Name"
  //       type="text"
  //       value={ready_style_number}
  //       name="step_3.ready_style_number"
  //       onChange={setForm}
  //       autoComplete="off"
  //     />
  //   </div>
  // </div>
  //     ) : formData.step_2.garment_type !== "Denim Jacket" &&
  //       formData.step_3.choose_style === "Custom Style" ? (
  //       <div>
  //         {" "}
  //         {data[formData.step_2.garment_type].custom.map((x) => {
  //           return (
  //             <div key={x.title} className="step_form-wrapper">
  //               <h4 className="selection_subheading"> {x.title}</h4>
  //               <div className="selection_wrap grid4col">
  //                 {x.type === "radio" ? (
  //                   x.options.map((i) => {
  //                     return (
  //                       <div key={i} className="radio">
  //                         <input
  //                           type="radio"
  //                           id={`${x.title.split(" ").join("_")}_${i}`}
  //                           value={i}
  //                           name={`step_3.custom.${x.title
  //                             .split(" ")
  //                             .join("_")}`}
  //                           checked={
  //                             formData.step_3.custom[
  //                               x.title.split(" ").join("_")
  //                             ] === i
  //                           }
  //                           onChange={setForm}
  //                         />
  //                         <label
  //                           htmlFor={`${x.title.split(" ").join("_")}_${i}`}
  //                         >
  //                           {i}
  //                         </label>
  //                       </div>
  //                     );
  //                   })
  //                 ) : x.type === "text" ? (
  //                   <div className="inputs_wrap text-input">
  //                     <div className="inputs_wrap-inner">
  //                       <input
  //                         label={`${x.title.split(" ").join("_")}`}
  //                         type="text"
  //                         placeholder={x.title}
  //                         value={
  //                           formData.step_3.custom[x.title.split(" ").join("_")]
  //                         }
  //                         name={`step_3.custom.${x.title.split(" ").join("_")}`}
  //                         onChange={setForm}
  //                         autoComplete="off"
  //                       />
  //                     </div>
  //                   </div>
  //                 ) : x.type === "checkbox" ? (
  //                   x.options.map((i) => {
  //                     return (
  //                       <div key={i} className="checkbox">
  //                         <input
  //                           type="checkbox"
  //                           id={`${x.title.split(" ").join("_")}_${i}`}
  //                           value={i}
  //                           name={`step_3.custom.${x.title
  //                             .split(" ")
  //                             .join("_")}`}
  //                           onChange={(e) => onChecked(e)}
  //                           checked={
  //                             formData[
  //                               `step_3.custom.${x.title.split(" ").join("_")}`
  //                             ]
  //                           }
  //                         />
  //                         <label
  //                           htmlFor={`${x.title.split(" ").join("_")}_${i}`}
  //                         >
  //                           {i}
  //                         </label>

  //                         {formData.step_3.custom[
  //                           x.title.split(" ").join("_")
  //                         ] === "Monogram_Position" ? (
  //                           <input
  //                             type="text"
  //                             name={`step_3.custom.monogram_text.${i
  //                               .split(" ")
  //                               .join("_")}`}
  //                             value={
  //                               formData.step_3.custom.monogram_text[
  //                                 i.split(" ").join("_")
  //                               ]
  //                             }
  //                             maxLength="8"
  //                             onChange={setForm}
  //                             style={{ display: "block" }}
  //                           />
  //                         ) : null}
  //                       </div>
  //                     );
  //                   })
  //                 ) : (
  //                   <div className="inputs_wrap text-input">
  //                     <div className="inputs_wrap-inner">
  //                       <textarea
  //                         label="Name"
  //                         type="textarea"
  //                         placeholder={x.title}
  //                         value={
  //                           formData.step_3[
  //                             `custom.${x.title.split(" ").join("_")}`
  //                           ]
  //                         }
  //                         name={`step_3.custom.${x.title.split(" ").join("_")}`}
  //                         onChange={setForm}
  //                         value={
  //                           formData.step_3.custom[x.title.split(" ").join("_")]
  //                         }
  //                         autoComplete="off"
  //                       ></textarea>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     ) : null}
  //     {formData.step_2.garment_type === "Denim Jacket" ? (
  //       <div className="step_form-wrapper">
  //         {/* Style Number _Denim Jacket */}
  //         <h4 className="selection_subheading">Style Number</h4>
  //         <div className="selection_wrap grid4col">
  //           {data[formData.step_2.garment_type].style_number.map((i) => {
  //             return (
  //               <div key={i} className="radio">
  //                 <input
  //                   type="radio"
  //                   id={i}
  //                   value={i}
  //                   name="step_3.custom.style_number"
  //                   checked={formData.step_3?.custom?.style_number === i}
  //                   onChange={setForm}
  //                 />{" "}
  //                 <label htmlFor={i}>{i}</label>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         {/* Thread Color - Denim Jacket */}
  //         <h4 className="selection_subheading">Thread color</h4>
  //         <div className="selection_wrap grid4col">
  //           {data[formData.step_2.garment_type].thread_color.map((i) => {
  //             return (
  //               <div key={i} className="radio">
  //                 <input
  //                   type="radio"
  //                   id={i}
  //                   value={i}
  //                   name="step_3.custom.thread_color"
  //                   checked={formData.step_3.custom.thread_color === i}
  //                   onChange={setForm}
  //                 />{" "}
  //                 <label htmlFor={i}>{i}</label>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         {/* Style Number _Denim Jacket */}
  //         <div>
  //           <h4 className="selection_subheading">Button</h4>

  //           <div className="selection_wrap grid4col">
  //             {data[formData.step_2.garment_type].button.map((i) => {
  //               return (
  //                 <div key={i} className="radio">
  //                   <input
  //                     type="radio"
  //                     id={`button_${i}`}
  //                     value={i}
  //                     name="step_3.custom.button"
  //                     checked={formData.step_3.custom.button === i}
  //                     onChange={setForm}
  //                   />{" "}
  //                   <label htmlFor={`button_${i}`}>{i}</label>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //         {/* Leather Label _Denim Jacket */}
  //         <div>
  //           <h4 className="selection_subheading">Leather Label</h4>

  //           <div className="selection_wrap grid4col">
  //             {data[formData.step_2.garment_type].leather_Label.map((i) => {
  //               return (
  //                 <div key={i} className="radio">
  //                   <input
  //                     type="radio"
  //                     id={`leather_Label_${i}`}
  //                     value={i}
  //                     name="step_3.custom.leather_Label"
  //                     checked={formData.step_3.custom.leather_Label === i}
  //                     onChange={setForm}
  //                   />{" "}
  //                   <label htmlFor={`leather_Label_${i}`}>{i}</label>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       </div>
  //     ) : null}
  // <div className="form_footer">
  //   <Button onClick={() => navigation.previous()}>Back</Button>
  //   <Button onClick={() => navigation.next()}>Next</Button>
  // </div>
  //   </div>
  // );
}
