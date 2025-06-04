export default function ErrorText({ errText }) {
  if (!errText || !errText.message) {
    return null;
  }

  return <div className="pt-form-helper-text">{errText.message}</div>;
}
