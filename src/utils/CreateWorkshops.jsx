
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
    <section>
      <h2>Create a workshop</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Workshop ID
          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="workshop-009"
            required
          />
        </label>

        <label>
          Title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
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

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Location
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Create workshop"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}
