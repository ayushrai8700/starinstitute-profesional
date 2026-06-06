/* ==========================================================================
   STARX INSTITUTE CENTRAL CORE JS
   ========================================================================== */

const starxBranchesRegistry = [
    { 
        id: "delhi-north", 
        name: "North Campus Central", 
        location: "GTB Nagar, Delhi 110009", 
        helpline: "+91 98765 00001",
        map: "#"
    },
    { 
        id: "gurgaon-sec45", 
        name: "Gurugram Prime Hub", 
        location: "Sector 45, Near Huda City Center", 
        helpline: "+91 98765 00002",
        map: "#"
    },
    { 
        id: "noida-sec18", 
        name: "Noida Learning Wing", 
        location: "Sector 18, Noida Blue Line", 
        helpline: "+91 98765 00003",
        map: "#"
    },
    { 
        id: "dwarka-sec10", 
        name: "West Delhi Academy", 
        location: "Sector 10, Dwarka, Delhi", 
        helpline: "+91 98765 00004",
        map: "#"
    },
    { 
        id: "saket-south", 
        name: "South Campus Portal", 
        location: "Saket Metro District, Delhi", 
        helpline: "+91 98765 00005",
        map: "#"
    }
];

// 1. POPULATE BRANCH DROPDOWNS
function populateBranchDropdowns() {
    const dropdown = document.getElementById('preferredBranch');
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">-- Choose Branch Campus --</option>';
    starxBranchesRegistry.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch.id;
        option.textContent = `${branch.name} - ${branch.location.split(',')[0]}`;
        dropdown.appendChild(option);
    });
}

// 2. FORM SUBMISSION HANDLER
function initFormHandler() {
    const form = document.getElementById('admission-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('applicantName').value;
        const phone = document.getElementById('applicantPhone').value;
        const program = document.getElementById('targetProgram').value;
        const branchKey = document.getElementById('preferredBranch').value;

        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        const branch = starxBranchesRegistry.find(b => b.id === branchKey) || { name: "Central Office" };

        alert(`Success! Inquiry Recorded.\n\nThank you ${name}. Your request for ${program} at our ${branch.name} has been logged.\n\nA counsellor will contact you shortly.`);
        form.reset();
    });
}

// 3. GLOBAL INITIALIZER
document.addEventListener('DOMContentLoaded', () => {
    populateBranchDropdowns();
    initFormHandler();
    
    // Smooth header effect (if not handled by inline scripts)
    const header = document.querySelector('nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });
    }
});
