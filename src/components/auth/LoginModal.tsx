import { useState } from "react";
import { AcademicButton } from "@/components/ui/academic-button";
import { UserRole } from "@/types";
import { PASSCODES } from "@/data/constants";

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (role: "Professor" | "Class Representative") => void;
}

export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [role, setRole] = useState<"Professor" | "Class Representative">("Professor");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (PASSCODES[role] === code.trim()) {
      onSuccess(role);
    } else {
      setError("Incorrect passcode. Contact CR/Professor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm grid place-items-center p-4 z-50">
      <div className="w-full max-w-md rounded-2xl academic-card p-6 shadow-strong">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Staff Sign In</h3>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role
            </label>
            <select
              className="academic-input w-full"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="Professor">Professor</option>
              <option value="Class Representative">Class Representative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Passcode
            </label>
            <input
              className="academic-input w-full"
              type="password"
              placeholder="Enter passcode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <AcademicButton type="submit" className="flex-1">
              Sign in
            </AcademicButton>
            <AcademicButton variant="secondary" type="button" onClick={onClose}>
              Cancel
            </AcademicButton>
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
            For classroom use only. Use unique passcodes and rotate if compromised.
          </p>
        </form>
      </div>
    </div>
  );
}