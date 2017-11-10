package fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters;

import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;

@FunctionalInterface
public interface HourCounter {
    AtomicSpan eval(AtomicSpan atomicSpan);
}
