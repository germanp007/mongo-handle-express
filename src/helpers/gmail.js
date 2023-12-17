import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/emailConfig.js";
export const generateEmailToken = (email, expiredTime) => {
  const token = jwt.sign({ email }, config.gmail.secretToken, {
    expiresIn: expiredTime,
  });

  return token;
};

export const sendChangePassword = async (req, email, token) => {
  const domain = `${req.protocol}://${req.get("host")}`;
  const link = `${domain}/reset-password?token=${token}`;

  //Enviar correo con enlace
  await transporter.sendMail({
    from: "Ecommerce TodoTecnology",
    to: email,
    subject: "Cambio de contraseña",
    html: `
        <div>
            <h2>Hola!!</h2>
            <p>Solicitud de cambio de contraseña, haz clic en el siguiente enlace</p>
            <a href="${link}">
                <button>
                    Restablecer contraseña
                </button>
            </a>
        </div>
    `,
  });
};
