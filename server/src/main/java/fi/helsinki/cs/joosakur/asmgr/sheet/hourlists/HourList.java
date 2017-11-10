package fi.helsinki.cs.joosakur.asmgr.sheet.hourlists;

import fi.helsinki.cs.joosakur.asmgr.entity.Assistant;
import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;
import org.jopendocument.dom.OOUtils;
import org.jopendocument.dom.spreadsheet.Sheet;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.stream.Stream;

public abstract class HourList {

    protected Sheet sheet;

    public HourList(Sheet sheet) {
        this.sheet = sheet;
    }

    public File saveAs(String filePath) throws IOException {
        if(sheet == null)
            throw new IllegalStateException("Not populated");
        File outputFile = new File(filePath);
        return sheet.getSpreadSheet().saveAs(outputFile);
    }

    public Sheet getSheet() {
        return sheet;
    }

    public void saveAsAndOpen(String filePath) throws IOException {
        OOUtils.open(saveAs(filePath));
    }

    public abstract HourList populate(Assistant assistant, Stream<AtomicSpan> atomicSpans);

    protected String getWeekdayAbbreviation(LocalDate date) {
        switch (date.getDayOfWeek()) {
            case MONDAY:
                return "ma";
            case TUESDAY:
                return "ti";
            case WEDNESDAY:
                return "ke";
            case THURSDAY:
                return "to";
            case FRIDAY:
                return "pe";
            case SATURDAY:
                return "la";
            case SUNDAY:
                return "su";
            default:
                throw new IllegalArgumentException();
        }
    }
}
