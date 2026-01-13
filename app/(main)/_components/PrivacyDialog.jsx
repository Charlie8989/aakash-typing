const PrivacyDialog = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black max-w-lg w-full rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer hover:rotate-90 transition-transform duration-300 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>

        <div className="text-sm space-y-2 text-gray-700 max-h-80 overflow-y-auto">
          <p>
            TypeWithAakash respects your privacy. We do not collect sensitive personal
            information.
          </p>

          <p>
            We may store typing speed, accuracy, and test results only to improve
            user experience.
          </p>

          <p>
            Your data is never sold or shared with third parties.
          </p>

          <p>
            By using TypeWithAakash, you agree to this privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDialog;
