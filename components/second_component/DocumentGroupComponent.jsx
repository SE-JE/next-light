import React, { useState } from 'react';

import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';

import {
  ButtonComponent,
  InputDefaultComponent,
  InputImageComponent,
} from '../base_component';

export default function DocumentGroupComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDocuments, setDataDocuments] = useState([]);

  const [formIdentity, setFormIdentity] = useState([{}]);
  const [formImage, setFormImage] = useState([]);


  return (
    <div>
      {formIdentity.map((data, key) => {
        return(
          <div key={key} className='flex gap-5 mb-3'>
            <div className='w-[60%]'>
              <InputDefaultComponent placeholder={"Identity card Number"} name={`identityt_number[${key}]`} />
              
            </div>
            <div className='w-[40%]'>
              <InputImageComponent
                type='file'
                placeholder={"Image"}
                aspect={"[3/2]"}
                name={`identity_image[${key}]`}
                onChange={(e) => {
                  let newImage = [];
                            
                  if(formImage[key]) {
                    newImage = formImage.map((dflt, index) => (
                      index == key ? e : dflt
                    ))
                  } else {
                    newImage = [...formImage, e]
                  }
                  
                  setFormImage(newImage)
                }}
              />
            </div>
          </div>
        )
      })}
      <div className='flex -mt-5'>
        <ButtonComponent
          font={"bold"}
          icon={faFileCirclePlus}
          label='Add other'
          color={"secondary"}
          onClick={() => setFormIdentity([...formIdentity, {}])}
        />
      </div>
    </div>
  )
}
