
import { useState } from "react";
import { useAuth } from "react-oidc-context";

const API_URL =
  "https://84s3ufgnnj.execute-api.ap-southeast-2.amazonaws.com/workshops";

export default function CreateWorkshop({ onCreated }) {
  const auth = useAuth();
  console.log("Authenticated:", auth.isAuthenticated);
  console.log("User profile:", auth.user?.profile);
  console.log("Groups:", auth.user?.profile?.["cognito:groups"]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "Technology",
    description: "",
    date: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const groups = auth.user?.profile?.["cognito:groups"] || [];
  const isAdmin = groups.includes("Admin");

  if (!auth.isAuthenticated || !isAdmin) {
    return null;
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const workshop = {
      ...form,
      id: form.id.trim(),
    };

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.access_token}`,
        },
        body: JSON.stringify(workshop),
      });

      if (!response.ok) {
        throw new Error(
          `Could not create workshop (${response.status})`
        );
      }

      setMessage("Workshop created successfully!");
      setForm({
        id: "",
        title: "",
        category: "Technology",
        description: "",
        date: "",
        location: "",
      });

      onCreated?.();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="create-workshop-section">
      <div className="create-workshop-container">
        <header className="create-workshop-heading">
          <span className="create-workshop-eyebrow">Workshop management</span>
          <h2>Create a workshop</h2>
          <p>Add a new session to the WorkshopHub events list.</p>
        </header>

        <form className="create-workshop-form" onSubmit={handleSubmit}>
          <div className="create-workshop-fields">
            <label className="create-workshop-field">
              <span>Workshop ID</span>
              <input
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="e.g. workshop-009"
                required
              />
            </label>

            <label className="create-workshop-field">
              <span>Title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Give your workshop a clear title"
                required
              />
            </label>

            <label className="create-workshop-field">
              <span>Category</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>Technology</option>
                <option>Creative</option>
                <option>Business</option>
              </select>
            </label>

            <label className="create-workshop-field">
              <span>Date</span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="create-workshop-field">
              <span>Location</span>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Online or Room 204"
                required
              />
            </label>

            <label className="create-workshop-field create-workshop-field-wide">
              <span>Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="What will attendees learn or do?"
                rows="4"
                required
              />
            </label>
          </div>

          <div className="create-workshop-actions">
            <p>Complete the required fields to publish this workshop.</p>
            <button type="submit" disabled={saving}>
              {saving ? "Creating workshop..." : "Create workshop"}
            </button>
          </div>
          {message && (
            <p
              className={`create-workshop-message ${
                message === "Workshop created successfully!" ? "is-success" : "is-error"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
