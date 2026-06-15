import React from 'react'
import userStore from '../../store/UserStroe'
const SubmitButton = (props) => {

  let{isFormSubmit} = userStore();

  if (isFormSubmit === false) {
    return (
      <button
        onClick={props.onClick}
        type="submit"
        className={props.className}
      >
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className="spinner-border spinner-border-sm" role="status"></div>
        Processing...
      </button>
    );
  }
}

export default SubmitButton