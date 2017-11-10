package fi.helsinki.cs.joosakur.asmgr.sheet.groups;

import java.time.LocalDate;

public class DateSickNotesGroup {
    private LocalDate date;
    private boolean sick;
    private String notes;

    public DateSickNotesGroup(LocalDate date, boolean sick, String notes) {
        this.date = date;
        this.sick = sick;
        this.notes = notes;
    }

    public LocalDate getDate() {
        return date;
    }

    public boolean isSick() {
        return sick;
    }

    public String getNotes() {
        return notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DateSickNotesGroup that = (DateSickNotesGroup) o;

        if (sick != that.sick) return false;
        if (!date.equals(that.date)) return false;
        return notes != null ? notes.equals(that.notes) : that.notes == null;
    }

    @Override
    public int hashCode() {
        int result = date.hashCode();
        result = 31 * result + (sick ? 1 : 0);
        result = 31 * result + (notes != null ? notes.hashCode() : 0);
        return result;
    }
}
