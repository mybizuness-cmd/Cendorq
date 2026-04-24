import { FreeCheckForm } from "./free-check-form";
import { FreeCheckIntro } from "./free-check-intro";
import { FreeCheckTrustStrip } from "./free-check-trust-strip";

export default function FreeCheckRouteBridge() {
  return (
    <>
      <FreeCheckIntro />
      <FreeCheckTrustStrip />
      <FreeCheckForm />
    </>
  );
}
