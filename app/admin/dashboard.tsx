"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Baby,
  Bone,
  CalendarCheck,
  Droplets,
  ImagePlus,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Smile,
  Sparkles,
  Trash2,
  Wrench,
  X,
} from "lucide-react";

type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  icon: string;
};

type DoctorRecord = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  bio: string;
  image?: string;
};

type Settings = {
  isOpen: boolean;
  hours: { days: string; hours: string; closed?: boolean }[];
};

const iconOptions = [
  { value: "smile", label: "ابتسامة", Icon: Smile },
  { value: "sparkles", label: "تبييض", Icon: Sparkles },
  { value: "bone", label: "زراعة", Icon: Bone },
  { value: "wrench", label: "حشو", Icon: Wrench },
  { value: "activity", label: "عصب", Icon: Activity },
  { value: "droplets", label: "تنظيف", Icon: Droplets },
  { value: "baby", label: "أطفال", Icon: Baby },
];

const emptyService: Omit<ServiceRecord, "id"> = {
  slug: "",
  title: "",
  titleEn: "",
  shortDescription: "",
  shortDescriptionEn: "",
  icon: "smile",
};

const emptyDoctor: Omit<DoctorRecord, "id"> = {
  name: "",
  specialty: "",
  qualifications: [],
  bio: "",
  image: "",
};

  const inputClass =
  "w-full rounded-lg border border-charcoal/20 bg-background px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-charcoal";

const uploadDoctorImage = async (doctorId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doctorId", doctorId);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("فشل رفع الصورة");
    const data = await res.json();
    return data.url as string;
  };

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [tab, setTab] = useState<"services" | "doctors" | "settings">("services");
  const [editingService, setEditingService] = useState<(ServiceRecord & { isNew?: boolean }) | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<(DoctorRecord & { isNew?: boolean }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2500);
  };

  const loadAll = useCallback(async () => {
    const [servicesRes, doctorsRes, settingsRes] = await Promise.all([
      fetch("/api/services"),
      fetch("/api/doctors"),
      fetch("/api/settings"),
    ]);
    if (servicesRes.ok) setServices(await servicesRes.json());
    if (doctorsRes.ok) setDoctors(await doctorsRes.json());
    if (settingsRes.ok) setSettings(await settingsRes.json());
  }, []);

  useEffect(() => {
    loadAll()
      .then(() => setAuthed(true))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, [loadAll]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthed(true);
        loadAll();
      } else {
        const data = await res.json();
        setLoginError(data.error || "كلمة المرور غير صحيحة");
      }
    } catch {
      setLoginError("خطأ في الاتصال");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setPassword("");
  };

  const saveService = async () => {
    if (!editingService) return;
    setSaving(true);
    try {
      const isNew = !services.some((s) => s.id === editingService.id);
      const res = await fetch(isNew ? "/api/services" : `/api/services/${editingService.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        showToast("تم حفظ الخدمة");
        setEditingService(null);
        loadAll();
      } else {
        showToast("فشل الحفظ");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("تم حذف الخدمة");
        loadAll();
      }
    } finally {
      setDeletingId(null);
    }
  };

  const saveDoctor = async () => {
    if (!editingDoctor) return;
    setSaving(true);
    try {
      const isNew = !doctors.some((d) => d.id === editingDoctor.id);
      const res = await fetch(isNew ? "/api/doctors" : `/api/doctors/${editingDoctor.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDoctor),
      });
      if (res.ok) {
        showToast("تم حفظ الطبيب");
        setEditingDoctor(null);
        loadAll();
      } else {
        showToast("فشل الحفظ");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteDoctor = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطبيب؟")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("تم حذف الطبيب");
        loadAll();
      }
    } finally {
      setDeletingId(null);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showToast("تم حفظ الإعدادات");
      } else {
        showToast("فشل الحفظ");
      }
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-charcoal/10 bg-surface p-8">
          <h1 className="mb-1 text-xl font-bold text-charcoal">لوحة التحكم</h1>
          <p className="mb-6 text-sm text-muted">أدخل كلمة المرور للمتابعة</p>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="admin-password" className={labelClass}>
                كلمة المرور
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                autoFocus
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button
              type="submit"
              disabled={loggingIn || !password}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {loggingIn && <Loader2 className="h-4 w-4 animate-spin" />}
              دخول
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <h1 className="text-lg font-bold text-charcoal">لوحة تحكم العيادة</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="rounded-lg border border-charcoal/20 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              عرض الموقع
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-red-300 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {toast && (
          <div className="mb-4 rounded-lg border border-primary/30 bg-mint px-4 py-3 text-sm font-medium text-primary">
            {toast}
          </div>
        )}

        <div className="mb-6 flex gap-2">
          {(
            [
              { key: "services", label: "الخدمات" },
              { key: "doctors", label: "الأطباء" },
              { key: "settings", label: "الإعدادات والمواعيد" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.key
                  ? "bg-primary text-white"
                  : "border border-charcoal/20 bg-surface text-charcoal hover:border-primary hover:text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "services" && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">الخدمات ({services.length})</h2>
              <button
                onClick={() => setEditingService({ id: crypto.randomUUID(), ...emptyService, isNew: true })}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
                إضافة خدمة
              </button>
            </div>
            {services.length === 0 ? (
              <p className="rounded-xl border border-dashed border-charcoal/20 bg-surface p-10 text-center text-sm text-muted">
                لا توجد خدمات بعد — أضف أول خدمة.
              </p>
            ) : (
              <ul className="grid gap-3">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-charcoal/10 bg-surface p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint text-primary">
                        {iconOptions.find((i) => i.value === service.icon)?.Icon
                          ? (() => {
                              const Opt = iconOptions.find((i) => i.value === service.icon)!;
                              return <Opt.Icon className="h-5 w-5" />;
                            })()
                          : <Smile className="h-5 w-5" />}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{service.title}</p>
                        <p className="text-xs text-muted">{service.titleEn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingService(service)}
                        aria-label={`تعديل ${service.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal/15 text-charcoal transition-colors hover:border-primary hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        disabled={deletingId === service.id}
                        aria-label={`حذف ${service.title}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal/15 text-charcoal transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "doctors" && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal">الأطباء ({doctors.length})</h2>
              <button
                onClick={() => setEditingDoctor({ id: crypto.randomUUID(), ...emptyDoctor, isNew: true })}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
                إضافة طبيب
              </button>
            </div>
            {doctors.length === 0 ? (
              <p className="rounded-xl border border-dashed border-charcoal/20 bg-surface p-10 text-center text-sm text-muted">
                لا يوجد أطباء بعد — أضف أول طبيب.
              </p>
            ) : (
              <ul className="grid gap-3">
                {doctors.map((doctor) => (
                  <li
                    key={doctor.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-charcoal/10 bg-surface p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{doctor.name}</p>
                      <p className="text-xs text-muted">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingDoctor(doctor)}
                        aria-label={`تعديل ${doctor.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal/15 text-charcoal transition-colors hover:border-primary hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteDoctor(doctor.id)}
                        disabled={deletingId === doctor.id}
                        aria-label={`حذف ${doctor.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal/15 text-charcoal transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {tab === "settings" && settings && (
          <section className="max-w-2xl">
            <h2 className="mb-4 text-lg font-bold text-charcoal">حالة العيادة والمواعيد</h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-xl border border-charcoal/10 bg-surface p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-charcoal">حالة العيادة</p>
                    <p className="text-xs text-muted">لما تكون مقفلة هيظهر إشعار في الصفحة الرئيسية</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, isOpen: !settings.isOpen })}
                    role="switch"
                    aria-checked={settings.isOpen}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${settings.isOpen ? "bg-primary" : "bg-charcoal/30"}`}
                  >
                    <span
                      className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${settings.isOpen ? "right-1" : "right-7"}`}
                    />
                  </button>
                </div>
                <p className={`rounded-lg px-4 py-2.5 text-sm font-semibold ${settings.isOpen ? "bg-mint text-primary" : "bg-red-50 text-red-700"}`}>
                  {settings.isOpen ? "العيادة مفتوحة الآن" : "العيادة مقفلة الآن — الزشاف هيشوفوا الإشعار"}
                </p>
                <button
                  onClick={() => {
                    setSettings({ ...settings, isOpen: !settings.isOpen });
                    setTimeout(saveSettings, 100);
                  }}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold text-white transition-colors ${
                    settings.isOpen
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-primary hover:bg-primary-dark"
                  }`}
                >
                  {settings.isOpen ? "اغلق العياده" : "افتح العياده"}
                </button>
              </div>

              <div className="rounded-xl border border-charcoal/10 bg-surface p-5">
                <p className="mb-4 text-sm font-semibold text-charcoal">ساعات العمل</p>
                <div className="flex flex-col gap-4">
                  {settings.hours.map((hour, index) => (
                    <div key={index} className="grid items-end gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>الأيام</label>
                        <input
                          value={hour.days}
                          onChange={(e) => {
                            const hours = [...settings.hours];
                            hours[index] = { ...hour, days: e.target.value };
                            setSettings({ ...settings, hours });
                          }}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>المواعيد</label>
                        <input
                          value={hour.hours}
                          onChange={(e) => {
                            const hours = [...settings.hours];
                            hours[index] = { ...hour, hours: e.target.value };
                            setSettings({ ...settings, hours });
                          }}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setSettings({
                        ...settings,
                        hours: [...settings.hours, { days: "", hours: "" }],
                      })
                    }
                    className="inline-flex items-center gap-2 self-start rounded-lg border border-dashed border-charcoal/30 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة صف مواعيد
                  </button>
                </div>
              </div>

              <button
                onClick={saveSettings}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                حفظ الإعدادات
              </button>
            </div>
          </section>
        )}
      </main>

      {editingService && (
        <Modal onClose={() => setEditingService(null)}>
          <h3 className="mb-5 text-lg font-bold text-charcoal">
            {editingService.isNew ? "إضافة خدمة جديدة" : "تعديل الخدمة"}
          </h3>
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>العنوان بالعربي</label>
                <input value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>العنوان بالإنجليزي</label>
                <input value={editingService.titleEn} onChange={(e) => setEditingService({ ...editingService, titleEn: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>الرابط (slug)</label>
              <input
                value={editingService.slug}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                dir="ltr"
                className={`${inputClass} text-left`}
                placeholder="teeth-whitening"
              />
            </div>
            <div>
              <label className={labelClass}>الوصف بالعربي</label>
              <textarea value={editingService.shortDescription} onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })} rows={3} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>الوصف بالإنجليزي</label>
              <textarea value={editingService.shortDescriptionEn} onChange={(e) => setEditingService({ ...editingService, shortDescriptionEn: e.target.value })} rows={3} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>الأيقونة</label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setEditingService({ ...editingService, icon: opt.value })}
                    aria-label={opt.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                      editingService.icon === opt.value
                        ? "border-primary bg-mint text-primary"
                        : "border-charcoal/15 text-muted hover:border-primary/40"
                    }`}
                  >
                    <opt.Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={saveService}
                disabled={saving || !editingService.title || !editingService.slug}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                حفظ
              </button>
              <button
                onClick={() => setEditingService(null)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-charcoal/20 px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal/40"
              >
                <X className="h-4 w-4" />
                إلغاء
              </button>
            </div>
          </div>
        </Modal>
      )}

      {editingDoctor && (
        <Modal onClose={() => setEditingDoctor(null)}>
          <h3 className="mb-5 text-lg font-bold text-charcoal">
            {editingDoctor.isNew ? "إضافة طبيب جديد" : "تعديل الطبيب"}
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>الاسم الكامل</label>
              <input value={editingDoctor.name} onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>التخصص</label>
              <input value={editingDoctor.specialty} onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>المؤهلات (سطر لكل مؤهل)</label>
              <textarea
                value={editingDoctor.qualifications.join("\n")}
                onChange={(e) => setEditingDoctor({ ...editingDoctor, qualifications: e.target.value.split("\n").filter((q) => q.trim()) })}
                rows={3}
                className={inputClass}
                placeholder="بكالوريوس طب وجراحة الأسنان — جامعة القاهرة"
              />
            </div>
            <div>
              <label className={labelClass}>نبذة</label>
              <textarea value={editingDoctor.bio} onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })} rows={3} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>صورة الطبيب</label>
              <div className="flex items-center gap-4">
                {editingDoctor.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editingDoctor.image} alt="صورة الطبيب" className="h-20 w-20 rounded-full border border-charcoal/10 object-cover" width={80} height={80} />
                )}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-charcoal/20 px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:border-primary hover:text-primary">
                  <ImagePlus className="h-4 w-4" />
                  <span>{editingDoctor.image ? "تغيير الصورة" : "رفع صورة"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadDoctorImage(editingDoctor.id, file);
                        setEditingDoctor({ ...editingDoctor, image: url });
                        showToast("تم رفع الصورة");
                      } catch {
                        showToast("فشل رفع الصورة");
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={saveDoctor}
                disabled={saving || !editingDoctor.name || !editingDoctor.specialty}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                حفظ
              </button>
              <button
                onClick={() => setEditingDoctor(null)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-charcoal/20 px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal/40"
              >
                <X className="h-4 w-4" />
                إلغاء
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
