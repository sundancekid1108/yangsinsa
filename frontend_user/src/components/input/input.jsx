import React, { forwardRef, useRef } from "react";


const Input = ({ label,type, register, options, name, ref,   ...props}, ) => {


    return (
        <div>
            <div>
                <label>
                    {label}
                </label>

            </div>
            <div>
                <input
                    ref={ref}
                    type={type}
                    {...props}
                    {...register}
                />

            </div>
        </div>
    )

}

export default Input

