function isLineLineIntersecting(from1, to1, from2, to2) {
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
    if (u > 0 && u < 1 && t > 0 && t < 1) {
        const intersection = createVector(
            from2.x + t * (to2.x - from2.x),
            from2.y + t * (to2.y - from2.y)
        );
        return intersection;
    }
    return false;
}

function isPolyPolyIntersecting(poly1, poly2) {
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const intersection = isLineLineIntersecting(
                poly1[i],
                poly1[(i + 1) % poly1.length],
                poly2[j],
                poly2[(j + 1) % poly2.length]
            );
            if (intersection) {
                return true;
            }
        }
    }
    return;
}
