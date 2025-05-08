import React, { useEffect, useState } from 'react';
import { CAccordion, CAccordionItem } from '@cscfi/csc-ui-react';

export const ReferencesAccordion = () => {
    const [references, setReferences] = useState([]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const header = document.getElementById('references-') || document.getElementById('references');
            if (header) {
                const list = header.nextElementSibling;
                if (list && list.tagName === 'OL') {
                    const rawHTML = list.innerHTML;
                    // Split and clean list items
                    const rawItems = rawHTML.split(/<\/li>/i)
                        .map(item => item.replace(/<li[^>]*>/i, '').trim())
                        .filter(item => item.length > 0);

                    setReferences(rawItems);

                    list.remove();
                    header.remove();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => observer.disconnect();
    }, []);

    if (references.length === 0) return null;

    return (
        <CAccordion value="References">
            <CAccordionItem heading="References" value="references">
                <ol>
                    {references.map((ref, idx) => (
                        <li key={idx} className='flex gap-2'>
                            <span className="font-medium">[{idx + 1}]</span> <span className='text-gray-700' dangerouslySetInnerHTML={{ __html: ref }} />
                        </li>
                    ))}
                </ol>
            </CAccordionItem>
        </CAccordion>
    );
};
