import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";

export default function PasswordInput() {
  const [exibir, setExibir] = React.useState(true);

  return (
    <>
      <div className="py-2" x-data="{ show: true }">
        <div className="relative border-b-2 border-b-gray3  flex flex-row items-center">
          <input
            placeholder="Senha"
            type={exibir ? "password" : "text"}
            className="text-md block px-3 py-2  w-full 
                focus:outline-none"
          />

          <div onClick={() => setExibir(!exibir)}>
            {exibir ? (
              <AiOutlineEye size={22} />
            ) : (
              <AiOutlineEyeInvisible size={22} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
