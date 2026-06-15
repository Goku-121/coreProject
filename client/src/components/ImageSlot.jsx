import React, { useState, useRef, useEffect, useCallback } from "react";

const ImageSlot = ({ index, img, onFileChange, onUrlChange, onRemove }) => {
    const [inputMode, setInputMode] = useState("file");
    const [pendingUrl, setPendingUrl] = useState("");
    const localRef = useRef(null);

    // Sync with parent when img changes (for edit mode)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setInputMode(img.type === "url" ? "url" : "file");
        if (img.type === "url") {
            setPendingUrl(img.url || "");
        } else {
            setPendingUrl("");
        }
    }, [img.type, img.url]);

    const handleUrlSubmit = useCallback(() => {
        const trimmed = pendingUrl.trim();
        if (trimmed) {
            onUrlChange(index, trimmed);
        }
    }, [pendingUrl, index, onUrlChange]);

    return (
        <div style={{
            border: "2px dashed #e2e8f0",
            borderRadius: "14px",
            overflow: "hidden",
            background: "#fafafa",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Header */}
            <div style={{
                padding: "8px 12px",
                background: "#f7fafc",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#718096" }}>
                    Image {index + 1}
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                    {["file", "url"].map(mode => (
                        <button
                            key={mode}
                            onClick={() => setInputMode(mode)}
                            style={{
                                padding: "3px 8px",
                                borderRadius: "6px",
                                border: "none",
                                fontSize: "11px",
                                cursor: "pointer",
                                fontWeight: 600,
                                background: inputMode === mode ? "#667eea" : "#e2e8f0",
                                color: inputMode === mode ? "#fff" : "#718096"
                            }}
                        >
                            <i className={`bi bi-${mode === "file" ? "upload" : "link-45deg"}`}></i>
                            {mode === "file" ? " Upload" : " URL"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview Area */}
            <div style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                minHeight: "120px"
            }}>
                {img.preview ? (
                    <div style={{ position: "relative", width: "100%" }}>
                        <img
                            src={img.preview}
                            alt={`img${index + 1}`}
                            style={{
                                width: "100%",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                            onError={e => {
                                e.target.src = "https://via.placeholder.com/200x120?text=Invalid+URL";
                            }}
                        />
                        <button
                            onClick={() => onRemove(index)}
                            style={{
                                position: "absolute",
                                top: "6px",
                                right: "6px",
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: "none",
                                background: "rgba(0,0,0,0.6)",
                                color: "#fff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px"
                            }}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: "center", color: "#cbd5e0" }}>
                        <i className="bi bi-image" style={{ fontSize: "32px" }}></i>
                        <div style={{ fontSize: "11px", marginTop: "6px" }}>No image</div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div style={{ padding: "10px", borderTop: "1px solid #e2e8f0" }}>
                {inputMode === "file" ? (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={localRef}
                            onChange={e => onFileChange(index, e)}
                        />
                        <button
                            onClick={() => localRef.current?.click()}
                            style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "8px",
                                border: "1.5px dashed #667eea",
                                background: "rgba(102,126,234,0.05)",
                                color: "#667eea",
                                fontWeight: 600,
                                fontSize: "12px",
                                cursor: "pointer"
                            }}
                        >
                            <i className="bi bi-cloud-upload me-1"></i> Choose from Device
                        </button>
                    </>
                ) : (
                    <div style={{ display: "flex", gap: "6px" }}>
                        <input
                            type="text"
                            placeholder="Paste image URL..."
                            value={pendingUrl}
                            onChange={e => setPendingUrl(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleUrlSubmit()}
                            onBlur={handleUrlSubmit}
                            style={{
                                flex: 1,
                                padding: "7px 10px",
                                borderRadius: "8px",
                                border: "1.5px solid #e2e8f0",
                                fontSize: "12px",
                                color: "#2d3748",
                                outline: "none"
                            }}
                        />
                        <button
                            onClick={handleUrlSubmit}
                            style={{
                                padding: "7px 10px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#667eea",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "12px"
                            }}
                        >
                            <i className="bi bi-check"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageSlot;