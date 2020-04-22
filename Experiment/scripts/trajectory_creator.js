function trajectory_creator() {
    
    vignettes = [];
    
    // Load in vignettes
    $.ajax({
        url: 'stimuli/pilot_vig.csv',
        async: false,
        success: function (csvd) {
        vignettes = $.csv.toObjects(csvd);
        },
        dataType: "text",
        complete: function () {
        // call a function on complete
        console.log('Vignettes loaded.');
        }
    });
    
// Randomly sample to put together trajectories
    
    // Separate vignettes into types
    neg_disp = _.where(vignettes, {vig_type: '1'});
    pos_disp = _.where(vignettes, {vig_type: '2'});
    neg_sit = _.where(vignettes, {vig_type: '3'});
    pos_sit = _.where(vignettes, {vig_type: '4'});
    
    // Make control blocks (add indicator of block-type)
    neg_disp_ctrl = _.sample(neg_disp, 10);
    neg_disp_ctrl = _.mapObject(neg_disp_ctrl, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'CTRL';
        o.shift_type = 'NONE';
        o.traj_start = 'neg-disp';
        o.traj_end = 'neg-disp';
        return o;
    });
    neg_disp_remaining = _.difference(neg_disp, neg_disp_ctrl);
    
    pos_disp_ctrl = _.sample(pos_disp, 10);
    pos_disp_ctrl = _.mapObject(pos_disp_ctrl, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'CTRL';
        o.shift_type = 'NONE';
        o.traj_start = 'pos-disp';
        o.traj_end = 'pos-disp';
        return o;
    });
    pos_disp_remaining = _.difference(pos_disp, pos_disp_ctrl);
    
    neg_sit_ctrl = _.sample(neg_sit, 10);
    neg_sit_ctrl = _.mapObject(neg_sit_ctrl, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'CTRL';
        o.shift_type = 'NONE';
        o.traj_start = 'neg-sit';
        o.traj_end = 'neg-sit';
        return o;
    });
    neg_sit_remaining = _.difference(neg_sit, neg_sit_ctrl);
    
    pos_sit_ctrl = _.sample(pos_sit, 10);
    pos_sit_ctrl = _.mapObject(pos_sit_ctrl, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'CTRL';
        o.shift_type = 'NONE';
        o.traj_start = 'pos-sit';
        o.traj_end = 'pos-sit';
        return o;
    });
    pos_sit_remaining = _.difference(pos_sit, pos_sit_ctrl);
    
    // Randomize _remaining vignette arrays and split into chunks of 5
    neg_disp_rand = _.chunk(_.shuffle(neg_disp_remaining), 5);
    pos_disp_rand = _.chunk(_.shuffle(pos_disp_remaining), 5);
    neg_sit_rand = _.chunk(_.shuffle(neg_sit_remaining), 5);
    pos_sit_rand = _.chunk(_.shuffle(pos_sit_remaining), 5);
    
    // Make shift blocks (add indicator of block-type)
    
    // 1 Shifts
    
    // Neg_disp --> Neg_sit
    nd_ns = neg_disp_rand[0].concat(neg_sit_rand[0]);
    nd_ns = _.mapObject(nd_ns, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'ONE';
        o.traj_start = 'neg-disp';
        o.traj_end = 'neg-sit';
        return o;
    });
    
    ns_nd = neg_sit_rand[1].concat(neg_disp_rand[1]);
    ns_nd = _.mapObject(ns_nd, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'ONE';
        o.traj_start = 'neg-sit';
        o.traj_end = 'neg-disp';
        return o;
    });
    
    pd_ps = pos_disp_rand[0].concat(pos_sit_rand[0]);
    pd_ps = _.mapObject(pd_ps, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'ONE';
        o.traj_start = 'pos-disp';
        o.traj_end = 'pos-sit';
        return o;
    });
    
    ps_pd = pos_sit_rand[1].concat(pos_disp_rand[1]);
    ps_pd = _.mapObject(ps_pd, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'ONE';
        o.traj_start = 'pos-sit';
        o.traj_end = 'pos-disp';
        return o;
    });
    
    // 2 Shifts
    
    // Neg_disp --> Pos_sit
    nd_ps = neg_disp_rand[2].concat(pos_sit_rand[2]);
    nd_ps = _.mapObject(nd_ps, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'BOTH';
        o.traj_start = 'neg-disp';
        o.traj_end = 'pos-sit';
        return o;
    });
    
    ps_nd = pos_sit_rand[3].concat(neg_disp_rand[3]);
    ps_nd = _.mapObject(ps_nd, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'BOTH';
        o.traj_start = 'pos-sit';
        o.traj_end = 'neg-disp';
        return o;
    });
    
    pd_ns = pos_disp_rand[2].concat(neg_sit_rand[2]);
    pd_ns = _.mapObject(pd_ns, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'BOTH';
        o.traj_start = 'pos-disp';
        o.traj_end = 'neg-sit';
        return o;
    });
    
    ns_pd = neg_sit_rand[3].concat(pos_disp_rand[3]);
    ns_pd = _.mapObject(ns_pd, function(el) {
        var o = Object.assign({}, el);
        o.block_type = 'SHIFT';
        o.shift_type = 'BOTH';
        o.traj_start = 'neg-sit';
        o.traj_end = 'pos-disp';
        return o;
    });
    
    // Combine all twelve blocks and shuffle
    all_blocks = [neg_disp_ctrl, pos_disp_ctrl, neg_sit_ctrl, pos_sit_ctrl, nd_ns, ns_nd, pd_ps, ps_pd, nd_ps, ps_nd, pd_ns, ns_pd];
    all_blocks = _.shuffle(all_blocks);
    
    // Create sentence order by randomizing whether "action" or "context" comes first (I can't believe this works!! Woohoooo)
    sent_options = ['action', 'context'];
    
    sent_order = new Array(120);   
    sent_order = _.map(sent_order, function(el) {return _.sample(sent_options, 2)});
    
   // sent_order = _.map(sent_order_template, function(el) {return _.shuffle(el)});
    
// Save them all together into an array of trajectories. (Be sure to figure out a way to label them!!)
    combined = [all_blocks, sent_order];
    
    
// Randomize those and send it back to the main script.
    return combined
    
}
