import React, { useState } from 'react';

import {
  faDownload,
  faPaperPlane,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

import {
  create,
  download,
} from '../../pages/api/crud';
import { ButtonComponent } from '../base_component';

export default function ImportComponent({urlFormat, urlUpload, setRefresh}) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [file, setFile] = useState("");

  return (
    <>
      <div
          className={`fixed top-0 z-40 w-screen h-screen bg-black opacity-50 modal-wrap ${
            show ? "left-0 opacity-1" : "-left-[110%] opacity-0"
          }`}
          onClick={() => setShow(false)}
        ></div>
      <div className="relative ">
        <ButtonComponent
          font={"bold"}
          icon={faUpload}
          label="Import"
          bg={"secondary"}
          rounded
          loading={loading}
          onClick={async () => setShow(true)}
        />
        <div className={`absolute left-1/2 z-40 p-5 translate-y-full -translate-x-1/2 bg-white rounded-md shadow-md -bottom-2 ${!show ? "scale-y-0" : "scale-100"}`}>
          <form 
            className="flex items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

                setLoading(true)
                // const formData = new FormData();

                // formData.append('file', e.target['file'].files)

                let response = await create(`admin/customer/import`, new FormData(e.target));
      
                if(response.status == 200) {
                  setLoading(false)
                  setFile("")
                  setRefresh()
                  setShow(false)
                } else {
                  setLoading(false)
                }
            }}
          >
            <ButtonComponent 
              type={"button"}
              icon={faDownload} 
              label="Format" 
              bg={"secondary"}
              loading={downloadLoading}
              onClick={async () => {
                setDownloadLoading(true)
                let response = await download(`admin/customer/import-rules`, "Lila-customer-format.xlsx");
      
                if(response.status == 200) {
                  setDownloadLoading(false)
                }
              }} 
            />
            <input type="file" name="file" className="p-3 border rounded-lg w-96" onChange={(e) => setFile(e.target.value)} value={file} />
            <ButtonComponent 
              loading={loading}
              type={"submit"}
              icon={faPaperPlane} 
              label="Submit" 
              bg={"primary"}
              disabled={!file}
            />
          </form>
        </div>
      </div>
    </>
  )
}
