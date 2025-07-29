import { useState } from "react";
import "./style.css";

interface FormData {
  personal: { name: string; email: string };
  address: { street: string; city: string };
  preferences: { notifications: boolean };
}

interface FormErrors {
  personal?: { name?: string; email?: string };
}

function validateField(value: string, type: string) {
  if (!value) return "This field is required";

  if (type === "email") {
    return /\S+@\S+\.\S+/.test(value) ? null : "Invalid email format";
  }

  return null;
}

function FormWizard() {
  const [form, setForm] = useState<{
    step: number;
    data: FormData;
    errors: FormErrors;
    status: "editing" | "submitting";
  }>({
    step: 1,
    data: {
      personal: { name: "", email: "" },
      address: { street: "", city: "" },
      preferences: { notifications: false },
    },
    errors: {},
    status: "editing",
  });

  function handleFieldChange(
    section: keyof FormData,
    field: string,
    value: string | boolean
  ) {
    setForm((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [section]: {
          ...prev.data[section],
          [field]: value,
        },
      },
      errors: {
        ...prev.errors,
        [section]: {
          ...prev.errors[section as keyof FormErrors],
          [field]: undefined,
        },
      },
    }));
  }

  function handleNextStep() {
    const errors: FormErrors = {};

    if (form.step === 1) {
      const nameError = validateField(form.data.personal.name, "text");
      const emailError = validateField(form.data.personal.email, "email");

      if (nameError || emailError) {
        errors.personal = {};
        if (nameError) errors.personal.name = nameError;
        if (emailError) errors.personal.email = emailError;

        setForm((prev) => ({ ...prev, errors }));
        return;
      }
    }

    setForm((prev) => ({ ...prev, step: prev.step + 1 }));
  }

  function handlePrevStep() {
    setForm((prev) => ({ ...prev, step: prev.step - 1 }));
  }

  function handleSubmit() {
    setForm((prev) => ({ ...prev, status: "submitting" }));

    setTimeout(() => {
      setForm((prev) => ({ ...prev, status: "editing" }));
    }, 1000);
  }

  function renderStep() {
    switch (form.step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Personal Information</h2>
            <div className="form-field">
              <label>Name:</label>
              <input
                type="text"
                value={form.data.personal.name}
                onChange={(e) =>
                  handleFieldChange("personal", "name", e.target.value)
                }
              />
              {form.errors.personal?.name && (
                <div className="error">{form.errors.personal.name}</div>
              )}
            </div>
            <div className="form-field">
              <label>Email:</label>
              <input
                type="email"
                value={form.data.personal.email}
                onChange={(e) =>
                  handleFieldChange("personal", "email", e.target.value)
                }
              />
              {form.errors.personal?.email && (
                <div className="error">{form.errors.personal.email}</div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>Address</h2>
            <div className="form-field">
              <label>Street:</label>
              <input
                type="text"
                value={form.data.address.street}
                onChange={(e) =>
                  handleFieldChange("address", "street", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>City:</label>
              <input
                type="text"
                value={form.data.address.city}
                onChange={(e) =>
                  handleFieldChange("address", "city", e.target.value)
                }
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>Preferences</h2>
            <div className="form-field checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={form.data.preferences.notifications}
                  onChange={(e) =>
                    handleFieldChange(
                      "preferences",
                      "notifications",
                      e.target.checked
                    )
                  }
                />
                Receive notifications
              </label>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="form-wizard">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(form.step / 3) * 100}%` }}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (form.status !== "submitting") handleSubmit();
        }}
      >
        {renderStep()}

        <div className="form-navigation">
          {form.step > 1 && (
            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
          )}
          {form.step < 3 ? (
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          ) : (
            <button type="submit" disabled={form.status === "submitting"}>
              {form.status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Ex03() {
  return (
    <div className="container">
      <FormWizard />
    </div>
  );
}
