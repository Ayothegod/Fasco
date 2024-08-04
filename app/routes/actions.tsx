import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import React from "react";
import { newsletterInputSchema } from "~/lib/schema";
import Mailgun from "mailgun.js";
import FormData from "form-data";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  console.log(process.env.MAILGUN_API_KEY);

  if (intent === "subscribe") {
    const submission = parseWithZod(formData, {
      schema: newsletterInputSchema,
    });

    if (submission.status !== "success") {
      return submission.reply();
    }

    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "",
    });

    const data = {
      from: "heyayomideadebisi@gmail.com",
      to: ["ayodasilva12@gmail.com"],
      subject: "Subscribe to Fasco ecommerce newsletter",
      html:
        'Hello, lets goo <a href="http://0.0.0.0:3030/validate?' +
        '">Click here to add your email address to a mailing list</a>',
    };
    // const mail = await mg.messages.create(
    //   process.env.MAILGUN_DOMAIN || "",
    //   data
    // );
    // console.log(mail);
    // console.log(mail.status);
    // console.log(mail.details);

    mg.messages
      .create(process.env.MAILGUN_DOMAIN || "", data)
      .then((msg) => console.log(msg))
      .catch((err) => console.error(err));

    return json({ status: "success", msg: "User suscribed successfully" });
  }

  return redirect("/dashboard");
}

export default function Actions() {
  return null;
}
