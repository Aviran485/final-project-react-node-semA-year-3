import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // 📌 Fetch reports from the server
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports", {
        withCredentials: true,
      });
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 📌 Start editing a report
  const startEditing = (report) => {
    setEditingReport({
      ...report,
      description: report.description,
      location: report.location,
      hasCollar: report.has_collar === "yes" ? "yes" : "no",
    });
  };

  // 📌 Cancel editing
  const cancelEditing = () => {
    setEditingReport(null);
  };

  // 📌 Save the edited report
  const saveEdit = async () => {
    if (!editingReport) return;
  
    console.log("🚀 Sending update request for:", editingReport.id);
    console.log("Payload:", {
      description: editingReport.description,
      location: editingReport.location,
      has_collar: editingReport.hasCollar,
      status: editingReport.status, // ✅ Now updating status too
    });
  
    try {
      await axios.put(
        `http://localhost:5000/api/reports/edit/${editingReport.id}`,
        {
          description: editingReport.description,
          location: editingReport.location,
          has_collar: editingReport.hasCollar,
          status: editingReport.status, // ✅ Send status update
        },
        { withCredentials: true }
      );
  
      console.log("✅ Report updated successfully");
      fetchReports(); // ✅ Reload reports after updating
      setEditingReport(null);
    } catch (error) {
      console.error("❌ Error updating report:", error);
    }
  };
  

  // 📌 Delete a report
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ האם אתה בטוח שברצונך למחוק את הדיווח?")) return;

    console.log("🚀 Deleting report with ID:", id);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/reports/delete/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("✅ Report deleted successfully");
        fetchReports();
      } else {
        console.error("❌ Error deleting report: Unexpected response", response);
      }
    } catch (error) {
      console.error("❌ Error deleting report:", error);
    }
  };

  // 📌 Update the report status
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reports/update/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log("✅ Status updated successfully");
      fetchReports();
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  // 📌 Open Report Details in Popup
  const openReportDetails = (report) => {
    setSelectedReport(report);
  };

  // 📌 Close Popup
  const closeReportDetails = () => {
    setSelectedReport(null);
  };

  return (
    <div className="reports-container">
      <h1>📋 ניהול דיווחים</h1>
      {loading ? (
        <p>⏳ טוען נתונים...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>תמונה</th>
              <th>תיאור</th>
              <th>מיקום</th>
              <th>קולר</th>
              <th>סטטוס</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} onClick={() => openReportDetails(report)} style={{ cursor: "pointer" }}>
                <td>
                  {report.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${report.image}`}
                      alt="Report"
                      width="80"
                    />
                  ) : (
                    "אין תמונה"
                  )}
                </td>
                <td>
                  {editingReport && editingReport.id === report.id ? (
                    <textarea
                      value={editingReport.description}
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    report.description
                  )}
                </td>
                <td>
                  {editingReport && editingReport.id === report.id ? (
                    <input
                      type="text"
                      value={editingReport.location}
                      onChange={(e) =>
                        setEditingReport({
                          ...editingReport,
                          location: e.target.value,
                        })
                      }
                    />
                  ) : (
                    report.location
                  )}
                </td>
                <td>{report.has_collar === "yes" ? "כן" : "לא"}</td>
                <td>
  {editingReport && editingReport.id === report.id ? (
    <select
      value={editingReport.status}
      onChange={(e) =>
        setEditingReport({ ...editingReport, status: e.target.value })
      }
      onClick={(e) => e.stopPropagation()} // ✅ Prevents accidental popup opening
    >
      <option value="לא טופל">לא טופל</option>
      <option value="בטיפול">בטיפול</option>
      <option value="נסגר">נסגר</option>
    </select>
  ) : (
    report.status
  )}
</td>

                <td>
                  {editingReport && editingReport.id === report.id ? (
                    <>
                      <button className="save-btn" onClick={(e) => { e.stopPropagation(); saveEdit(); }}>
  💾 שמור
</button>
<button className="cancel-btn" onClick={(e) => { e.stopPropagation(); cancelEditing(); }}>
  ❌ בטל
</button>

                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(report);
                        }}
                      >
                        ✏️ ערוך
                      </button>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(report.id);
                        }}
                      >
                        🗑️ מחק
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Popup Modal for Report Details */}
      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>📌 פרטי דיווח</h2>
            {selectedReport.image ? (
              <img
                src={`http://localhost:5000/uploads/${selectedReport.image}`}
                alt="Report"
                width="300"
                onError={(e) => {
                  console.error("❌ Image failed to load:", e.target.src);
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <p>🔍 אין תמונה זמינה</p>
            )}
            <p><strong>תיאור:</strong> {selectedReport.description}</p>
            <p><strong>מיקום:</strong> {selectedReport.location}</p>
            <p>
              <strong>מיקום במפה:</strong>{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedReport.location}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 הצג במפה
              </a>
            </p>
            <button onClick={closeReportDetails}>❌ סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
