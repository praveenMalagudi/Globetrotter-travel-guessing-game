const FieldError = ({ errorMessage }: { errorMessage: string | undefined }) => {
  return (
    <div>
      {errorMessage && (
        <p className="text-destructive-600 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FieldError;
