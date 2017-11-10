package fi.helsinki.cs.joosakur.asmgr.sheet.hourcounters;

import fi.helsinki.cs.joosakur.asmgr.sheet.AtomicSpan;

public class HourCounterHeta extends HourCounterBasic {

    @Override
    public AtomicSpan eval(AtomicSpan atomicSpan) {
        AtomicSpan eval = super.eval(atomicSpan);
        //todo: triple wages
        return eval;
    }
}
