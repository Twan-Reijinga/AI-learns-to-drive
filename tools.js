function isLineLineIntersecting(from1, to1, from2, to2, firstIsRay) {
    const d =
        (to1.x - from1.x) * (to2.y - from2.y) -
        (to1.y - from1.y) * (to2.x - from2.x);
    if (d == 0) {
        return false;
    }
    const t =
        ((from2.x - from1.x) * (to1.y - from1.y) -
            (from2.y - from1.y) * (to1.x - from1.x)) /
        d;
    const u =
        ((to2.y - from2.y) * (to2.x - from1.x) +
            (from2.x - to2.x) * (to2.y - from1.y)) /
        d;
    if ((firstIsRay || u < 1) && u > 0 && t > 0 && t < 1) {
        const intersection = createVector(
            from2.x + t * (to2.x - from2.x),
            from2.y + t * (to2.y - from2.y)
        );
        return intersection;
    }
    return false;
}

function isPolyLineIntersecting(poly, line) {
    for (let i = 0; i < poly.length; i++) {
        const intersection = isLineLineIntersecting(
            poly[i],
            poly[(i + 1) % poly.length],
            line.from,
            line.to
        );
        if (intersection) {
            return true;
        }
    }
    return;
}
